import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UploadThumbnailPhotoCommand } from '../command/upload-thumbnail.command';
import { UserRepository } from 'src/features/user/repositories';
import { UserDocument } from 'src/features/user/schemas';
import { CloudinaryService } from 'src/modules/cloudinary/services/cloudinary.service';

@CommandHandler(UploadThumbnailPhotoCommand)
export class UploadThumbnailPhotoCommandHandler
  implements ICommandHandler<UploadThumbnailPhotoCommand>
{
  constructor(
    public cloudinaryService: CloudinaryService,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(command: UploadThumbnailPhotoCommand): Promise<UserDocument> {
    const file = await this.cloudinaryService.uploadFile(command.file, {
      folder: 'thumbnail-photos',
    });

    const fileUrl = file.url || file.secure_url;

    return this.userRepository.findByIdAndUpdate(command.id, {
      $set: { thumbnail: fileUrl },
    });
  }
}
