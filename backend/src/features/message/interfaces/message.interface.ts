import { User } from './user.interface';

export interface IMessage {
  user: User;
  messageTime: string;
  message: string;
  roomName: string;
}
