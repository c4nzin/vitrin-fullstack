import { CreatePostDto } from 'src/features/user/dto';
import { UserDocument } from 'src/features/user/schemas';
export declare class CreateTweetCommand {
    user: UserDocument;
    createPost: CreatePostDto;
    file?: Express.Multer.File;
    constructor(user: UserDocument, createPost: CreatePostDto, file?: Express.Multer.File);
}
