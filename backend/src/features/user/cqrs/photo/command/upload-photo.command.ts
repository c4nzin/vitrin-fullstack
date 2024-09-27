export class UploadPhotoCommand {
  constructor(
    public readonly file: Express.Multer.File,
    public readonly id: string,
  ) {}
}
