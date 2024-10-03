export class UploadThumbnailPhotoCommand {
  constructor(
    public readonly file: Express.Multer.File,
    public readonly id: string,
  ) {}
}
