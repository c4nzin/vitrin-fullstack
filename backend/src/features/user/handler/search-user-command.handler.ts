import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchUserCommand } from '../command/search-user.command';
import { UserDocument } from '../schemas';
import { UserRepository } from '../repositories';
import { BadRequestException } from '@nestjs/common';

@QueryHandler(SearchUserCommand)
export class SearchUserCommandHandler implements IQueryHandler<SearchUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(query: SearchUserCommand): Promise<UserDocument[]> {
    if (!query.params || typeof query.params !== 'string') {
      throw new BadRequestException('Query parameter is missing or invalid');
    }

    const searchQuery = await this.userRepository
      .find({
        $text: { $search: query.params },
      })
      .select('profilePicture username fullName ');

    return searchQuery;
  }
}
