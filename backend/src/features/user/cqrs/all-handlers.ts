import { UploadPhotoCommandHandler } from './photo/handler/upload-photo.handler';
import { FetchFollowersHandler } from '../../follow/cqrs/handler/fetch-followers.handler';
import { FollowCommandHandler } from '../../follow/cqrs/handler/follow.handler';
import { UnfollowCommandHandler } from '../../follow/cqrs/handler/unfollow.handler';
import { CreateTweetCommandHandler } from './tweets/handler/create-tweet.handler';
import { DeleteTweetCommandHandler } from './tweets/handler/delete-tweet.handler';
import { FetchTweetsCommandHandler } from './tweets/handler/fetch-tweets.handler';
import { LikeTweetCommandHandler } from './tweets/handler/like-tweet.handler';
import { UnlikeTweetCommandHandler } from './tweets/handler/unlike-tweet.handler';
import { UpdateEmailCommandHandler } from 'src/features/account/handler/update-email.handler';
import { UpdateProfileFieldsCommandHandler } from 'src/features/account/handler/update-profile.handler';
import { UploadThumbnailPhotoCommandHandler } from './photo/handler/upload-thumbnail.handler';
import { ChangePasswordCommandHandler } from '../../account/handler/change-password.handler';
import { ResetPasswordCommandHandler } from '../../account/handler/reset-password.handler';

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
  UploadThumbnailPhotoCommandHandler,
  ChangePasswordCommandHandler,
  ResetPasswordCommandHandler,
];
