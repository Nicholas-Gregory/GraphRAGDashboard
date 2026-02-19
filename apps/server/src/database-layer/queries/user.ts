import { User } from '@graphragdashboard/packages/schemas/user';
import { Driver } from 'neo4j-driver';
import bcrypt from 'bcryptjs';
import { join } from 'node:path';

export const createUser = async (db: Driver, userInput: Omit<User, 'nodes' | 'id' | 'joinedAt'>): Promise<Omit<User, 'nodes' | 'password'>> => {
  const hashedPassword = await bcrypt.hash(userInput.password, 10);
  
  const result = await db.executeQuery(
    `
    CREATE (u:User { id: $id, email: $email, password: $password, username: $username, joinedAt: $joinedAt })
    RETURN u
    `,
    {
      id: crypto.randomUUID(),
      email: userInput.email,
      password: hashedPassword,
      username: userInput.username,
      joinedAt: new Date().toISOString()
    }
  );

  const user = result.records[0].get('u').properties;
  
  return {
    id: user.id,
    email: user.email,
    username: user.username,
    joinedAt: user.joinedAt
  };
};
