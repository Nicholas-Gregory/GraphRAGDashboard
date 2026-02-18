import { User } from '@graphragdashboard/packages/schemas/user';
import { Driver } from 'neo4j-driver';
import bcrypt from 'bcryptjs';

export const createUser = async (db: Driver, user: Omit<User, 'nodes'>): Promise<User> => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  
  const result = await db.executeQuery(
    `
    CREATE (u:User { id: $id, email: $email, password: $password, username: $username })
    RETURN u
    `,
    {
      id: user.id,
      email: user.email,
      password: hashedPassword,
      username: user.username
    }
  );

  return result.records[0].get('u');
};
