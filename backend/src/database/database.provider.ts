import * as mongoose from 'mongoose';

export const database = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://localhost/cri-v3'),
  },
];
