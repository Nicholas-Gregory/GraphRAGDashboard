import { Driver } from "neo4j-driver";
import { WNOName } from '@graphragdashboard/packages/schemas/wno-name';

export const upsertWnoName = async (
  db: Driver, 
  name: Pick<WNOName, 'givenName' | 'surname'> & Partial<Pick<WNOName, 'middleName'>>,
  userId: string
): Promise<WNOName> => {
  const { givenName, middleName, surname } = name;
  const id = crypto.randomUUID();
  const dateAdded = new Date().toISOString();
  
  const result = await db.executeQuery(`
    MATCH (u:User { id: $userId })

    MERGE (n:Name { id: $id })<-[a:ADDED { date: $dateAdded }]-(u)

    MERGE (givenName:Text:Name:GivenName { content: $givenName })<-[:HAS_TEXT_PART { position: 0 }]-(n)
    MERGE (surname:Text:Name:Surname { content: $surname })

    WITH n, givenName, surname, a,
     CASE WHEN $middleName IS NOT NULL THEN [$middleName] ELSE [] END AS middleNamePath

    FOREACH (_ IN middleNamePath |
      MERGE (middleName:Text:Name:MiddleName { content: $middleName })<-[:HAS_TEXT_PART { position: 1 }]-(n)
      MERGE (givenName)-[:TEXT_NEXT]->(middleName)
      MERGE (surname)<-[:HAS_TEXT_PART { position: 2 }]-(n)
      MERGE (middleName)-[:TEXT_NEXT]->(surname)
    )

    WITH n, givenName, surname, a,
      CASE WHEN $middleName IS NULL THEN [1] ELSE [] END AS directPath
    FOREACH (_ IN directPath |
      MERGE (givenName)-[:TEXT_NEXT]->(surname)<-[:HAS_TEXT_PART { position: 1 }]-(n)
    )

    WITH n, givenName, surname, a
    OPTIONAL MATCH (n)-[:HAS_TEXT_PART]->(middleName:MiddleName)
    
    RETURN n.id AS id, givenName.content AS givenName, middleName.content AS middleName, surname.content AS surname, a.date AS dateAdded
  `, {
    id, dateAdded, givenName, middleName: middleName || null, surname, userId
  });
  
  let givenNameResult: string;
  let middleNameResult: string;
  let surnameResult: string;
  let idResult: string;
  let dateAddedResult: Date;

  for (let record of result.records) {
    givenNameResult = record.get('givenName');
    middleNameResult = record.get('middleName');
    surnameResult = record.get('surname');
    idResult = record.get('id');
    dateAddedResult = record.get('dateAdded');
  }

  return {
    id: idResult,
    givenName: givenNameResult,
    middleName: middleNameResult,
    surname: surnameResult,
    dateAdded: dateAddedResult
  }
}