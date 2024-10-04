import { FetchFollowersHandler } from '../../follow/handler/fetch-followers.handler';
import { FollowCommandHandler } from '../../follow/handler/follow.handler';
import { UnfollowCommandHandler } from '../../follow/handler/unfollow.handler';
import { UpdateEmailCommandHandler } from 'src/features/account/handler/update-email.handler';
import { UpdateProfileFieldsCommandHandler } from 'src/features/account/handler/update-profile.handler';
import { ChangePasswordCommandHandler } from '../../account/handler/change-password.handler';
import { ResetPasswordCommandHandler } from '../../account/handler/reset-password.handler';

export const allHandlers = [
  UpdateEmailCommandHandler,
  UpdateProfileFieldsCommandHandler,
  UpdateEmailCommandHandler,
  FetchFollowersHandler,
  FollowCommandHandler,
  UnfollowCommandHandler,
  ChangePasswordCommandHandler,
  ResetPasswordCommandHandler,
];
