import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FetchTweetsCommand } from '../command/fetch-tweets.command';
import { PostDocument } from 'src/features/user/schemas';
import { PostRepository, UserRepository } from 'src/features/user/repositories';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(FetchTweetsCommand)
export class FetchTweetsCommandHandler implements ICommandHandler<FetchTweetsCommand> {
  constructor(
    private readonly postRepository: PostRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async execute(command: FetchTweetsCommand): Promise<PostDocument[]> {
    const { id, pagination } = command;

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new BadRequestException('No user found.');
    }

    const tweets = await this.postRepository.find({
      _id: { $in: user.posts },
    });

    const sortedTweets = tweets.sort((a, b) => {
      if (pagination.sort.length) {
        const sortField = pagination.sort[0].field;
        const sortOrder = pagination.sort[0].by;
        return sortOrder === 'ASC'
          ? a[sortField].localeCompare(b[sortField])
          : b[sortField].localeCompare(a[sortField]);
      }

      return 0;
    });

    const paginatedTweets = sortedTweets.slice(
      pagination.skip,
      pagination.skip + pagination.limit,
    );

    return paginatedTweets;
  }
}
