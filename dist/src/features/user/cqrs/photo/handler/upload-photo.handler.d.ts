import { ICommandHandler } from '@nestjs/cqrs';
import { UploadPhotoCommand } from '../command/upload-photo.command';
import { CloudinaryService } from 'src/modules/cloudinary/services/cloudinary.service';
import { UserRepository } from 'src/features/user/repositories';
import { UserDocument } from 'src/features/user/schemas';
export declare class UploadPhotoCommandHandler implements ICommandHandler<UploadPhotoCommand> {
    cloudinaryService: CloudinaryService;
    private readonly userRepository;
    constructor(cloudinaryService: CloudinaryService, userRepository: UserRepository);
    execute(command: UploadPhotoCommand): Promise<UserDocument>;
}
