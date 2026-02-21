import { Driver, Node } from "neo4j-driver";
import { Name, SubName } from '@graphragdashboard/packages/schemas/name';
import { InputSchema } from '@graphragdashboard/packages/types/util';
import { int, Integer } from 'neo4j-driver'; 

export const upsertName = async (
  db: Driver, 
  name: InputSchema<Name>,
  userId: string
): Promise<Name> => {
  const nameId = crypto.randomUUID();
  const dateAdded = new Date();
  const fullNameString = name.names
  .map(n => n.name)
  .join(' ');

  const indices: Integer[] = [];
  const subnames: string[] = [];
  const typeList: string[] = [];
  const primaryList: boolean[] = [];

  for (let i = 0; i < name.names.length; i++) {
    const subname = name.names[i];

    indices.push(int(i));
    subnames.push(subname.name);
    typeList.push(subname.type)
    primaryList.push(subname.primary)
  }
  
  const result = await db.executeQuery(`
    MATCH (u:User { id: $userId })

    MERGE (n:Name { id: $nameId })
    SET n.honorific = $honorific
    SET n.preferred = $preferred
    MERGE (u)-[a:ADDED { date: $date }]->(n)
    MERGE (n)-[:FULL_TEXT]->(t:Text:Name:FullText { content: $fullName })

    FOREACH (i IN $indices |
      FOREACH (_ IN CASE $typeList[i] WHEN 'given' THEN [1] ELSE [] END |
        FOREACH (_ IN CASE $primaryList[i] WHEN TRUE THEN [1] ELSE [] END |
          MERGE (n)-[:HAS_TEXT_PART { position: i }]->(sn:Text:Name:GivenName:PrimaryName { content: $subnames[i] })
        )
        
        FOREACH (_ IN CASE $primaryList[i] WHEN FALSE THEN [1] ELSE [] END |
          MERGE (n)-[:HAS_TEXT_PART { position: i }]->(sn:Text:Name:GivenName:SecondaryName { content: $subnames[i] })
        )
      )
      
      FOREACH (_ IN CASE $typeList[i] WHEN 'surname' THEN [1] ELSE [] END |
        FOREACH (_ IN CASE $primaryList[i] WHEN TRUE THEN [1] ELSE [] END |
          MERGE (n)-[:HAS_TEXT_PART { position: i }]->(sn:Text:Name:Surname:PrimaryName { content: $subnames[i] })
        )

        FOREACH (_ IN CASE $primaryList[i] WHEN FALSE THEN [1] ELSE [] END |
          MERGE (n)-[:HAS_TEXT_PART { position: i }]->(sn:Text:Name:Surname:SecondaryName { content: $subnames[i] })
        )
      )
    )

    WITH n, u, a, t
    MATCH (n)-[:HAS_TEXT_PART]->(nl:Text:Name)

    WITH nl, u, a, n, t
    ORDER BY nl.position ASC
    WITH collect(nl) AS nodeList, u, a, n, t

    UNWIND range(0, size(nodeList) -2) AS i
    WITH nodeList, u, a, n, nodeList[i] AS current, nodeList[i+1] AS next, t
    MERGE (current)-[:TEXT_NEXT]->(next)

    RETURN u.id AS addedBy, a.date AS dateAdded, n.id AS id, nodeList AS nameList, n.honorific AS honorific, n.preferred AS preferred, t.content AS fullName
  `, {
    userId, 
    nameId,
    indices,
    subnames,
    typeList,
    primaryList,
    date: dateAdded.toISOString(),
    honorific: name.honorific || null,
    preferred: name.preferred || null,
    fullName: fullNameString
  });

  let id: string;
  let namesNodeList: Node[];
  let dateAddedResult: Date;
  let addedBy: string;
  let preferred: string;
  let honorific: string;
  let fullName: string;
  for (const record of result.records) {
    id = record.get('id');
    namesNodeList = record.get('nameList');
    honorific = record.get('honorific');
    preferred = record.get('preferred');
    dateAddedResult = record.get('dateAdded');
    addedBy = record.get('addedBy');
    fullName = record.get('fullName');
  }

  const names: SubName[] = [];
  for (const node of namesNodeList) {
    let type;
    let primary;
    const name = node.properties.content;

    if (node.labels.includes('GivenName')) type = 'given';
    if (node.labels.includes('Surname')) type = 'surname';
    if (node.labels.includes('PrimaryName')) primary = true;
    if (node.labels.includes("SecondaryName")) primary = false;

    names.push({
      name, type, primary
    });
  }

  return {
    id: nameId,
    names,
    preferred,
    honorific,
    dateAdded: dateAddedResult,
    addedBy,
    fullText: fullName
  }
}