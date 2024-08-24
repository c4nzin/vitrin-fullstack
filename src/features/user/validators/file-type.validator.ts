import { FileValidator } from '@nestjs/common';
import * as fileType from 'file-type-mime';
import { UploadValidatorOptions } from './interfaces/upload-validator-options.interface';

export class FileTypeValidator extends FileValidator {
  private allowedMimeTypes: string[];

  constructor(public readonly validationOptions: UploadValidatorOptions) {
    super(validationOptions);
    this.allowedMimeTypes = this.validationOptions.mimeType;
  }

  public isValid(file: Express.Multer.File): boolean {
    const response = fileType.parse(file.buffer);

    return this.allowedMimeTypes.includes(response.mime);
  }

  public buildErrorMessage(): string {
    return `Upload not allowed. Upload only files of type: ${this.allowedMimeTypes.join(', ')}`;
  }
}
