import { AcceptFriendRequestCommandHandler } from './accept-friend-request.handler';
import { RejectFriendRequestCommandHandler } from './reject-friend-request.handler';
import { FetchRequestHandler } from './fetch-requests.handler';
import { SendFriendRequestCommandHandler } from './send-friend-request.handler';

export const allFriendHandlers = [
  AcceptFriendRequestCommandHandler,
  RejectFriendRequestCommandHandler,
  FetchRequestHandler,
  SendFriendRequestCommandHandler,
];
