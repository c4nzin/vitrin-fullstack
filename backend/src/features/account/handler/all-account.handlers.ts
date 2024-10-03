import { ChangePasswordCommandHandler } from './change-password.handler';
import { ResetPasswordCommandHandler } from './reset-password.handler';
import { UpdateEmailCommandHandler } from './update-email.handler';
import { UpdateProfileFieldsCommandHandler } from './update-profile.handler';
import { UploadPhotoCommandHandler } from './upload-photo.handler';
import { UploadThumbnailPhotoCommandHandler } from './upload-thumbnail.handler';

export const allAccountHandlers = [
  ResetPasswordCommandHandler,
  ChangePasswordCommandHandler,
  UpdateEmailCommandHandler,
  UpdateProfileFieldsCommandHandler,
  UploadPhotoCommandHandler,
  UploadThumbnailPhotoCommandHandler,
];
