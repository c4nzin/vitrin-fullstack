import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnlikeTweetCommand } from '../command/unlike-tweet.command';
import { PostRepository } from 'src/features/user/repositories';
import { PostDocument } from 'src/features/user/schemas';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(UnlikeTweetCommand)
export class UnlikeTweetCommandHandler implements ICommandHandler<UnlikeTweetCommand> {
  constructor(private readonly postRepository: PostRepository) {}

  public async execute(command: UnlikeTweetCommand): Promise<PostDocument> {
    const { user, id } = command;

    const tweet = await this.postRepository.findById(id);

    if (!tweet) {
      throw new BadRequestException('No tweet found to unlike.');
    }

    if (!tweet.likes.includes(user.id)) {
      throw new BadRequestException('You have already unliked this tweet.');
    }

    await tweet.updateOne({ $pull: { likes: user.id } });

    return tweet;
  }
}
