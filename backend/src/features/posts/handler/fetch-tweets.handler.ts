import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FetchTweetsCommand } from '../command/fetch-tweets.command';
import { UserRepository } from 'src/features/user/repositories';
import { BadRequestException } from '@nestjs/common';
import { PostDocument } from '../schemas/post.schema';
import { PostRepository } from '../repositories/post.repository';

@QueryHandler(FetchTweetsCommand)
export class FetchTweetsCommandHandler implements IQueryHandler<FetchTweetsCommand> {
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
