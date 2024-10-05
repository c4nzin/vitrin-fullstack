import { User } from 'src/features/user/schemas';

export interface IRoom {
  name: string;
  host: User;
  users: User[];
}
