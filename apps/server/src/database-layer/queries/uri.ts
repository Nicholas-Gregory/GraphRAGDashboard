import { Driver, Node } from "neo4j-driver";
import { Uri } from '@graphragdashboard/packages/schemas/uri';
import { InputSchema } from "@graphragdashboard/packages/types/util";
import { Integer, int } from 'neo4j-driver'

export const insertUri = async (
  db: Driver,
  uri: InputSchema<Uri>,
  userId: string
): Promise<Uri> => {
  const uriId = crypto.randomUUID();
  const dateAdded = new Date().toISOString();
  let fullUriString = uri.protocol;
  if (!fullUriString.includes('://')) fullUriString += `://${uri.authority.host}`; 
    else fullUriString += uri.authority.host;
  if (uri.authority.port && !fullUriString.endsWith(':')) fullUriString += `:${uri.authority.port}`
    else fullUriString += uri.authority.port;
  if (uri.path && !uri.path.startsWith('/')) fullUriString += `/${uri.path}`
    else fullUriString += uri.path;
  if (uri.query && !uri.query.startsWith('?')) fullUriString += `?${uri.query}`;
    else fullUriString += uri.query;

  const result = await db.executeQuery(`
    MATCH (u:User { id: $userId })

    MERGE (uri:Uri { id: $uriId })<-[a:ADDED { date: $dateAdded }]-(u)
    MERGE (uri)-[:FULL_TEXT]->(t:Text:Uri:FullText { content: $fullUri})

    MERGE (uri)-[:HAS_TEXT_PART { position: 0 }]->(protocol:Text:Uri:UriProtocol { content: $protocol })
    MERGE (uri)-[:HAS_TEXT_PART { position: 1 }]->(host:Text:Uri:UriHost { content: $host })

    FOREACH (_ IN CASE WHEN $port IS NOT NULL THEN [1] ELSE [] END |
      MERGE (uri)-[:HAS_TEXT_PART { position: 2 }]->(port:Number:Uri:UriPort { content: $port})
    )

    FOREACH (_ IN CASE WHEN $path IS NOT NULL THEN [1] ELSE [] END |
      MERGE (uri)-[:HAS_TEXT_PART { position: 3}]->(path:Text:Uri:UriPath { content: $path })
    )

    FOREACH (_ IN CASE WHEN $query IS NOT NULL THEN [1] ELSE [] END|
      MERGE (uri)-[:HAS_TEXT_PART { position: 4 }]->(query:Text:Uri:UriQuery { content: $query })
    )

    WITH uri, a, t, u
    MATCH (uri)-[:HAS_TEXT_PART]->(uriParts:Uri)

    WITH uri, uriParts, a, t, u
    ORDER BY uriParts.position ASC
    WITH collect(uriParts) as nodeList, a, t, u, uri

    UNWIND range(0, size(nodeList) - 2) AS i
    WITH nodeList, uri, a, t, u, nodeList[i] AS current, nodeList[i+1] AS next
    MERGE (current)-[:TEXT_NEXT { gap: true }]->(next)

    RETURN u.id AS addedBy, a.date AS dateAdded, uri.id AS id, nodeList AS partList, t.content AS fullUri
  `, {
    uriId, dateAdded, userId,
    protocol: uri.protocol,
    host: uri.authority.host,
    port: int(uri.authority.port) || null,
    path: uri.path || null,
    query: uri.query || null,
    fullUri: fullUriString
  });

  let id: string;
  let partsNodeList: Node[];
  let dateAddedResult: Date;
  let addedBy: string;
  let fullUri: string;
  for (const record of result.records) {
    id = record.get('id');
    partsNodeList = record.get('partList');
    dateAddedResult = record.get('dateAdded');
    addedBy = record.get('addedBy');
    fullUri = record.get('fullUri');
  }
  console.log(partsNodeList);
  let protocol: string;
  let host: string;
  let port: number;
  let path: string;
  let query: string;
  for (const node of partsNodeList) {
    if (node.labels.includes('UriProtocol')) protocol = node.properties.content;
    if (node.labels.includes('UriHost')) host = node.properties.content;
    if (node.labels.includes('UriPort')) port = node.properties.content;
    if (node.labels.includes('UriPath')) path = node.properties.content;
    if (node.labels.includes('UriQuery')) query = node.properties.content;
  }

  return {
    id,
    dateAdded: dateAddedResult,
    addedBy,
    fullText: fullUri,
    protocol,
    authority: { host, port },
    path, query
  }
}