import { UserDocument } from 'src/features/user/schemas';
import { CreatePostDto } from '../dto/create-post.dto';

export class CreateTweetCommand {
  constructor(
    public user: UserDocument,
    public createPost: CreatePostDto,
    public file?: Express.Multer.File,
  ) {}
}
