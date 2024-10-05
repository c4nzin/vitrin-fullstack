import { IMessage } from './message.interface';
import { User } from './user.interface';

export interface IServerToClient {
  chat: (e: IMessage) => void;
}

export interface IClientToServer {
  chat: (e: IMessage) => void;
  joinRoom: (e: { user: User; roomName: string }) => void;
}
