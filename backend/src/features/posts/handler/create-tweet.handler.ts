import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTweetCommand } from '../command/create-tweet.command';
import { CloudinaryService } from 'src/modules/cloudinary/services/cloudinary.service';
import { PostDocument } from '../schemas/post.schema';
import { PostRepository } from '../repositories/post.repository';

@CommandHandler(CreateTweetCommand)
export class CreateTweetCommandHandler implements ICommandHandler<CreateTweetCommand> {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  public async execute(command: CreateTweetCommand): Promise<PostDocument> {
    const { createPost, user, file } = command;

    const mediaUrl = await this.uploadMedia(file);

    const createdPost = await this.postRepository.create({
      author: user._id,
      content: createPost.content,
      media: mediaUrl,
    });

    await user.updateOne({ $push: { posts: createdPost._id } });

    return createdPost;
  }

  private async uploadMedia(file?: Express.Multer.File): Promise<string> {
    if (file) {
      const uploadedMedia = await this.cloudinaryService.uploadFile(file, {
        folder: 'media',
      });

      return uploadedMedia.url || uploadedMedia.secure_url;
    }

    return;
  }
}
