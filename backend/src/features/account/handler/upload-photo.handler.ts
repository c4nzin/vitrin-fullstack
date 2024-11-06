import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UploadPhotoCommand } from '../command/upload-photo.command';
import { CloudinaryService } from 'src/modules/cloudinary/services/cloudinary.service';
import { UserRepository } from 'src/features/user/repositories';
import { UserDocument } from 'src/features/user/schemas';

@CommandHandler(UploadPhotoCommand)
export class UploadPhotoCommandHandler implements ICommandHandler<UploadPhotoCommand> {
  constructor(
    public cloudinaryService: CloudinaryService,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(command: UploadPhotoCommand): Promise<UserDocument> {
    const file = await this.cloudinaryService.uploadFile(command.file, {
      folder: 'profile-photos',
    });

    const fileUrl = file.url || file.secure_url;

    return this.userRepository.findByIdAndUpdate(command.id, {
      $set: { profilePicture: fileUrl },
    });
  }
}
