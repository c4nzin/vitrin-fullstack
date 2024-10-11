import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FetchUserCommand } from '../command/fetch-user.command';
import { UserDocument } from 'src/features/user/schemas';
import { UserRepository } from 'src/features/user/repositories';
import { BadRequestException } from '@nestjs/common';

@QueryHandler(FetchUserCommand)
export class FetchUserCommandHandler implements IQueryHandler<FetchUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(query: FetchUserCommand): Promise<UserDocument> {
    const { id } = query;

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new BadRequestException('User not found with credentials that you provide.');
    }

    return user;
  }
}
