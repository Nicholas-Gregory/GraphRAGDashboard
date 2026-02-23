import { InputSchema } from "@graphragdashboard/packages/types/util";
import { Driver, int, Integer, Node } from "neo4j-driver";
import { Title, titleSchema } from "@graphragdashboard/packages/schemas/title";

export const insertTitle = async (
  db: Driver,
  title: InputSchema<Title>,
  userId: string
): Promise<Title> => {
  const titleId = crypto.randomUUID();
  const dateAdded = new Date().toISOString();
  const fullTitleString = title.mainTitles
  .reduce((acc, curr, i) => `${acc}${curr}${i === 0 ? ':' : ';'} `, '')
  .trim();

  const titles = title.mainTitles;
  const indices = titles.map((_, i) => int(i));

  const result = await db.executeQuery(`
    MATCH (u:User { id: $userId })
    
    MERGE (title:Title { id: $titleId })<-[a:ADDED { date: $dateAdded }]-(u)
    MERGE (title)-[:FULL_TEXT]->(t:Text:Title:FullText { content: $fullTitle })
    MERGE (title)-[:HAS_TEXT_PART { position: 0 }]->(:Text:Title:MainTitle { content: $titles[0] })

    FOREACH (_ IN CASE WHEN $sortTitle IS NOT NULL THEN [1] ELSE [] END |
      MERGE (title)-[:HAS_TEXT]->(st:Text:Title:SortTitle { content: $sortTitle })
    )

    FOREACH (i in $indices |
      FOREACH (_ IN CASE WHEN i+1 < size($indices) THEN [1] ELSE [] END |
        MERGE (title)-[:HAS_TEXT_PART { position: i+1 }]->(subTitle:Text:Title:SubTitle { content: $titles[i+1] })
        MERGE (title)-[:HAS_TEXT_PART { position: i }]->(:Text:Title { content: $titles[i] })-[:TEXT_NEXT]->(subTitle)
      )
    )

    WITH title, a, u, t
    MATCH (title)-[:HAS_TEXT_PART]->(tl:Text:Title)
    OPTIONAL MATCH (title)-[:HAS_TEXT]->(st:Text:Title:SortTitle)

    WITH title, a, u, t, st, tl
    ORDER BY tl.position ASC
    WITH collect(tl) AS nodeList, title, a, u, t, st

    RETURN t.content AS fullTitle, nodeList AS titleList, u.id AS addedBy, a.date AS dateAdded, title.id AS id, st.content AS sortTitle
  `, {
    userId, titleId, dateAdded,
    indices, titles,
    sortTitle: title.sortTitle || null,
    fullTitle: fullTitleString
  });

  let id: string;
  let addedBy: string;
  let dateAddedResult: Date;
  let fullText: string;
  let mainTitlesList: Node[];
  let sortTitle: string;
  for (const record of result.records) {
    id = record.get('id');
    mainTitlesList = record.get('titleList');
    addedBy = record.get('addedBy');
    dateAddedResult = record.get('dateAdded');
    fullText = record.get('fullTitle');
    sortTitle = record.get('sortTitle');
  }

  const mainTitles = mainTitlesList.map((v) => v.properties.content);

  return {
    id, addedBy, dateAdded: dateAddedResult, fullText,
    mainTitles, sortTitle
  }
}