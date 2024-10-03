import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteTweetCommand } from '../command/delete-tweet.command';
import { PostRepository, UserRepository } from 'src/features/user/repositories';
import { BadRequestException } from '@nestjs/common';
import { DeleteResult } from 'src/core/repositories/types/query.types';
import { Types } from 'mongoose';
import { PostDocument } from '../schemas/post.schema';

@CommandHandler(DeleteTweetCommand)
export class DeleteTweetCommandHandler implements ICommandHandler<DeleteTweetCommand> {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(command: DeleteTweetCommand): Promise<DeleteResult<PostDocument>> {
    const { user, id } = command;

    const postId = new Types.ObjectId(id);

    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new BadRequestException('No post found to remove.');
    }

    await this.userRepository.findByIdAndUpdate(user.id, {
      $pull: { posts: postId },
    });

    const deleteResult = await post.deleteOne();

    if (deleteResult.deletedCount === 0 || !deleteResult.acknowledged) {
      throw new BadRequestException('Failed to delete post.');
    }

    return deleteResult;
  }
}
