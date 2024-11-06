import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LikeTweetCommand } from '../command/like-tweet.command';
import { BadRequestException } from '@nestjs/common';
import { PostDocument } from '../schemas/post.schema';
import { PostRepository } from '../repositories/post.repository';

@CommandHandler(LikeTweetCommand)
export class LikeTweetCommandHandler implements ICommandHandler<LikeTweetCommand> {
  constructor(private readonly postRepository: PostRepository) {}

  public async execute(command: LikeTweetCommand): Promise<PostDocument> {
    const { id, user } = command;

    const tweet = await this.postRepository.findById(id);

    if (!tweet) {
      throw new BadRequestException('No tweet found.');
    }

    if (tweet.likes.includes(user.id)) {
      throw new BadRequestException('You already liked this tweet.');
    }

    tweet.likes.push(user.id);
    await tweet.save();

    return tweet;
  }
}
