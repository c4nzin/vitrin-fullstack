import { User } from 'src/features/user/schemas';
import { IMessage } from './message.interface';

export interface IServerToClient {
  chat: (e: IMessage) => void;
}

export interface IClientToServer {
  chat: (e: IMessage) => void;
  joinRoom: (e: { user: User; roomName: string }) => void;
}
