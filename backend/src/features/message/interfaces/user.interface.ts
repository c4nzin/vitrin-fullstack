import { UserDocument } from 'src/features/user/schemas';

export interface User {
  userId: string;
  username: string;
  socketId: string;
}
