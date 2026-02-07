import { UserDBSchema } from '@graphragdashboard/packages/schemas/user';
import Neode from 'neode';

export const db = Neode
.fromEnv()
.with({
  User: UserDBSchema
});