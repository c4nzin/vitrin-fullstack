import { MaxFileSizeValidator, ParseFilePipe } from '@nestjs/common';
import { FileTypeValidator } from '../../account/validators/file-type.validator';

export const TweetPipe = new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
    new FileTypeValidator({
      fileType: ['image/jpeg', 'image/png', 'image/jpg'],
    }),
  ],
  fileIsRequired: false,
});
