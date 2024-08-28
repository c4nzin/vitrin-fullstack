import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FetchFollowersCommand } from '../command/fetch-followers.command';
import { UserRepository } from 'src/features/user/repositories';
import { UserDocument } from 'src/features/user/schemas';

@CommandHandler(FetchFollowersCommand)
export class FetchFollowersHandler implements ICommandHandler<FetchFollowersCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(command: FetchFollowersCommand): Promise<UserDocument[]> {
    const { id, pagination } = command;

    const user = await this.userRepository.findById(id);

    const followers = await this.userRepository.find({
      _id: { $in: user.follower },
    });

    const sortedFollowers = followers.sort((a, b) => {
      if (pagination.sort.length) {
        const sortField = pagination.sort[0].field;
        const sortOrder = pagination.sort[0].by;
        return sortOrder === 'ASC'
          ? a[sortField].localeCompare(b[sortField])
          : b[sortField].localeCompare(a[sortField]);
      }
      return 0;
    });

    const paginatedFollowers = sortedFollowers.slice(
      pagination.skip,
      pagination.skip + pagination.limit,
    );

    return paginatedFollowers;
  }
}
