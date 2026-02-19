import { User } from '@graphragdashboard/packages/schemas/user';
import { Driver } from 'neo4j-driver';
import bcrypt from 'bcryptjs';

export const createUser = async (db: Driver, userInput: Omit<User, 'nodes' | 'id'>): Promise<Omit<User, 'nodes' | 'password'>> => {
  const hashedPassword = await bcrypt.hash(userInput.password, 10);
  
  const result = await db.executeQuery(
    `
    CREATE (u:User { id: $id, email: $email, password: $password, username: $username })
    RETURN u
    `,
    {
      id: crypto.randomUUID(),
      email: userInput.email,
      password: hashedPassword,
      username: userInput.username
    }
  );

  const user = result.records[0].get('u').properties;
  
  return {
    id: user.id,
    email: user.email,
    username: user.username
  };
};
