import { Driver } from "neo4j-driver";
import { Name } from "@graphragdashboard/packages/schemas/name";

export const addNewFullName = async (db: Driver, name: Pick<Name, 'firstName' | 'middleName' | 'lastName'>): Promise<Name> => {
  let { firstName, middleName, lastName } = name;
  const id = crypto.randomUUID();
  const dateAdded = new Date().toISOString();
  firstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  middleName = middleName.charAt(0).toUpperCase() + middleName.slice(1);
  lastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
  const fullName = `${firstName} ${middleName} ${lastName}`;
  const middleInitial = middleName.charAt(0);
  const firstLastName = `${firstName} ${lastName}`;
  const firstLastNameMI = `${firstName} ${middleInitial} ${lastName}`;

  const hubResult = await db.executeQuery(
    `
    MERGE (n:Name { id: $id, dateAdded: $dateAdded })

    MERGE (fullName:Name:FullName { content: $fullName })<-[:HAS_PART]-(n)
    MERGE (firstName:Name:FirstName { content: $firstName })<-[:HAS_PART]-(n)
    MERGE (middleName:Name:MiddleName { content: $middleName })<-[:HAS_PART]-(n)
    MERGE (lastName:Name:LastName { content: $lastName })<-[:HAS_PART]-(n)
    MERGE (middleInitial:Name:MiddleInitial { content: $middleInitial })<-[:HAS_PART]-(n)
    MERGE (firstLastName:Name:FirstLastName { content: $firstLastName })<-[:HAS_PART]-(n)
    MERGE (firstLastNameMI:Name:FirstLastNameMiddleInitial { content: $firstLastNameMI })<-[:HAS_PART]-(n)

    RETURN firstName.content, middleName.content, lastName.content, n.id, n.dateAdded`,
    { firstName, middleName, lastName, id, fullName, middleInitial, firstLastName, firstLastNameMI, dateAdded }
  );

  return {
    id: hubResult.records[0].get('n.id'),
    firstName: hubResult.records[0].get('firstName.content'),
    middleName: hubResult.records[0].get('middleName.content'),
    lastName: hubResult.records[0].get('lastName.content'),
    dateAdded: hubResult.records[0].get('n.dateAdded')
  };
}