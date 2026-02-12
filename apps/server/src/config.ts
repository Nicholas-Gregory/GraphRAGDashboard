import Neode from 'neode';

export const db = Neode
.fromEnv()
.with({
  User: {
    id: {
      primary: true,
      type: 'uuid',
      required: true
    }
  }
});