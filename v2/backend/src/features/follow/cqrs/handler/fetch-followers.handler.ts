import { CommandHandler, ICommandHandler, QueryHandler } from '@nestjs/cqrs';
import { FetchFollowersCommand } from '../command/fetch-followers.command';
import { UserRepository } from 'src/features/user/repositories';
import { UserDocument } from 'src/features/user/schemas';
import { PageDto, PageMetaDto } from 'src/common/pagination/dto';
import { Types } from 'mongoose';

@QueryHandler(FetchFollowersCommand)
export class FetchFollowersHandler implements ICommandHandler<FetchFollowersCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(command: FetchFollowersCommand): Promise<PageDto<UserDocument>> {
    const { id, pagination } = command;

    const user = await this.userRepository.findById(id);

    const followerIds = user.follower.map((id) => new Types.ObjectId(id));

    const followers = await this.userRepository
      .find({ follower: { $in: user.follower } })
      .sort(pagination.order)
      .skip(pagination.skip)
      .limit(pagination.take)
      .select(['-password', '-email']);

    console.log(followers);

    const itemCount = await this.userRepository.countDocuments({
      _id: { $in: user.follower },
    });

    console.log(itemCount);

    const pageMetaDto = new PageMetaDto({ pageOptionsDto: pagination, itemCount });

    return new PageDto(followers, pageMetaDto);
  }
}
