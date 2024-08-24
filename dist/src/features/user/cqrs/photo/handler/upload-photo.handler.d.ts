import { ICommandHandler } from '@nestjs/cqrs';
import { UploadPhotoCommand } from '../command/upload-photo.command';
import { CloudinaryService } from 'src/modules/cloudinary/services/cloudinary.service';
import { UserRepository } from 'src/features/user/repositories';
export declare class UploadPhotoCommandHandler implements ICommandHandler<UploadPhotoCommand> {
    private readonly cloudinaryService;
    private readonly userRepository;
    constructor(cloudinaryService: CloudinaryService, userRepository: UserRepository);
    execute(command: UploadPhotoCommand): Promise<void>;
}
