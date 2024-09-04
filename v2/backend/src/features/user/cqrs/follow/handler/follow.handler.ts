import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { FollowCommand } from '../command/follow.command';
import { UserRepository } from 'src/features/user/repositories';
import { UserDocument } from 'src/features/user/schemas';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(FollowCommand)
export class FollowCommandHandler implements ICommandHandler<FollowCommand> {
  constructor(private userRepository: UserRepository) {}

  public async execute(command: FollowCommand): Promise<void> {
    await this.checkIfTargetUserValid(command.targetId);

    await this.userRepository.findByIdAndUpdate(command.user.id, {
      $push: { follow: command.targetId },
    });

    await this.userRepository.findByIdAndUpdate(command.targetId, {
      $push: { follower: command.user.id },
    });
  }

  private async checkIfTargetUserValid(id: string): Promise<UserDocument> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new BadRequestException('No user found to follow!');
    }

    return user;
  }
}
