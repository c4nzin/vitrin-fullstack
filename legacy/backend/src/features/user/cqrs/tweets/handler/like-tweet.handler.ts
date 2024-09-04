import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LikeTweetCommand } from '../command/like-tweet.command';
import { PostRepository } from 'src/features/user/repositories';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(LikeTweetCommand)
export class LikeTweetCommandHandler implements ICommandHandler<LikeTweetCommand> {
  constructor(private readonly postRepository: PostRepository) {}

  public async execute(command: LikeTweetCommand): Promise<any> {
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
