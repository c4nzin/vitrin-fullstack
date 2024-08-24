import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UploadPhotoCommand } from '../command/upload-photo.command';
import { CloudinaryService } from 'src/modules/cloudinary/services/cloudinary.service';
import { UserRepository } from 'src/features/user/repositories';

@CommandHandler(UploadPhotoCommand)
export class UploadPhotoCommandHandler implements ICommandHandler<UploadPhotoCommand> {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(command: UploadPhotoCommand): Promise<void> {
    const file = await this.cloudinaryService.uploadFile(command.file, {
      async: true,
      folder: 'users',
    });

    await this.userRepository.findByIdAndUpdate(command.id, {
      $set: { profilePicture: file.url },
    });
  }
}
