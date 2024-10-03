import { UploadPhotoCommandHandler } from './photo/handler/upload-photo.handler';
import { FetchFollowersHandler } from '../../follow/cqrs/handler/fetch-followers.handler';
import { FollowCommandHandler } from '../../follow/cqrs/handler/follow.handler';
import { UnfollowCommandHandler } from '../../follow/cqrs/handler/unfollow.handler';
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
  UploadThumbnailPhotoCommandHandler,
  ChangePasswordCommandHandler,
  ResetPasswordCommandHandler,
];
