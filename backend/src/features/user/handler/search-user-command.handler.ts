import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SearchUserCommand } from '../command/search-user.command';
import { UserDocument } from '../schemas';
import { UserRepository } from '../repositories';

@QueryHandler(SearchUserCommand)
export class SearchUserCommandHandler implements IQueryHandler<SearchUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(query: SearchUserCommand): Promise<UserDocument[]> {
    const { userInput } = query;

    const searchQuery = await this.userRepository
      .find({
        $text: { $search: userInput.query },
      })
      .select('profilePicture username fullName ');

    return searchQuery;
  }
}
