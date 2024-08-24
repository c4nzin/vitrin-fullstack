import { UserDocument } from '../schemas';
import { CommandBus } from '@nestjs/cqrs';
export declare class PhotoController {
    private readonly commandBus;
    constructor(commandBus: CommandBus);
    uploadProfilePhoto(file: Express.Multer.File, id: string): Promise<UserDocument>;
    updateProfilephoto(file: Express.Multer.File, id: string): Promise<UserDocument>;
}
