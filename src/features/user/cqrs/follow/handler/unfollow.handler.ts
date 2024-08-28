import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UnfollowCommand } from '../command/unfollow.command';
import { UserRepository } from 'src/features/user/repositories';

@CommandHandler(UnfollowCommand)
export class UnfollowCommandHandler implements ICommandHandler<UnfollowCommand> {
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(command: UnfollowCommand): Promise<void> {
    await this.userRepository.findByIdAndUpdate(command.id, {
      $pull: { follower: command.user.id },
    });

    await this.userRepository.findByIdAndUpdate(command.user.id, {
      $pull: { follow: command.id },
    });
  }
}
