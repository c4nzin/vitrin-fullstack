import { AcceptFriendRequestCommandHandler } from './accept-friend-request.handler';
import { RejectFriendRequestCommandHandler } from './reject-friend-request.handler';
import { FetchRequestCommandHandler } from './fetch-requests.handler';
import { SendFriendRequestCommandHandler } from './send-friend-request.handler';

export const allFriendHandlers = [
  AcceptFriendRequestCommandHandler,
  RejectFriendRequestCommandHandler,
  FetchRequestCommandHandler,
  SendFriendRequestCommandHandler,
];
