import { User } from 'src/features/user/schemas';

export interface IMessage {
  user: User;
  messageTime: string;
  message: string;
  roomName: string;
}
