import { UpdateEmailCommandHandler } from './account/handler/update-email.handler';
import { UpdateProfileFieldsCommandHandler } from './account/handler/update-profile.handler';
import { UploadPhotoCommandHandler } from './photo/handler/upload-photo.handler';
import { FetchFollowersHandler } from './follow/handler/fetch-followers.handler';
import { FollowCommandHandler } from './follow/handler/follow.handler';
import { UnfollowCommandHandler } from './follow/handler/unfollow.handler';
import { CreateTweetCommandHandler } from './tweets/handler/create-tweet.handler';
import { DeleteTweetCommandHandler } from './tweets/handler/delete-tweet.handler';
import { FetchTweetsCommandHandler } from './tweets/handler/fetch-tweets.handler';
import { LikeTweetCommandHandler } from './tweets/handler/like-tweet.handler';
import { UnlikeTweetCommandHandler } from './tweets/handler/unlike-tweet.handler';
import { SendFriendRequestCommandHandler } from './account/handler/send-friend-request.handler';
import { AcceptFriendRequestCommandHandler } from './account/handler/accept-friend-request.handler';

export const allHandlers = [
  UpdateEmailCommandHandler,
  UpdateProfileFieldsCommandHandler,
  UpdateEmailCommandHandler,
  FetchFollowersHandler,
  FollowCommandHandler,
  UnfollowCommandHandler,
  UploadPhotoCommandHandler,
  CreateTweetCommandHandler,
  DeleteTweetCommandHandler,
  FetchTweetsCommandHandler,
  LikeTweetCommandHandler,
  UnlikeTweetCommandHandler,
  SendFriendRequestCommandHandler,
  AcceptFriendRequestCommandHandler,
];
