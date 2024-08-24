export declare class UploadPhotoCommand {
    readonly file: Express.Multer.File;
    readonly id: string;
    constructor(file: Express.Multer.File, id: string);
}
