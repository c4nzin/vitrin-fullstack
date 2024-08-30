import { CreatePostDto } from 'src/features/user/dto';
import { UserDocument } from 'src/features/user/schemas';

export class CreateTweetCommand {
  constructor(
    public user: UserDocument,
    public createPost: CreatePostDto,
    public file?: Express.Multer.File,
  ) {}
}
