import { FetchFollowersHandler } from './fetch-followers.handler';
import { FollowCommandHandler } from './follow.handler';
import { UnfollowCommandHandler } from './unfollow.handler';

export const allFollowHandlers = [
  FetchFollowersHandler,
  FollowCommandHandler,
  UnfollowCommandHandler,
];
