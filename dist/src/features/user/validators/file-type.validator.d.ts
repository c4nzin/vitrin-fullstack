import { FileValidator } from '@nestjs/common';
import { UploadValidatorOptions } from './interfaces/upload-validator-options.interface';
export declare class FileTypeValidator extends FileValidator {
    readonly validationOptions: UploadValidatorOptions;
    private allowedMimeTypes;
    constructor(validationOptions: UploadValidatorOptions);
    isValid(file: Express.Multer.File): boolean;
    buildErrorMessage(): string;
}
