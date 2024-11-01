import { MaxFileSizeValidator, ParseFilePipe } from '@nestjs/common';
import { FileTypeValidator } from '../validators/file-type.validator';

export const PhotoPipe = new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }),
    new FileTypeValidator({
      fileType: ['image/jpeg', 'image/png', 'image/jpg'],
    }),
  ],
});
