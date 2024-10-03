import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProfileFieldsCommand } from '../command/update-profile.command';
import { UserRepository } from 'src/features/user/repositories';
import { UserDocument } from 'src/features/user/schemas';

@CommandHandler(UpdateProfileFieldsCommand)
export class UpdateProfileFieldsCommandHandler
  implements ICommandHandler<UpdateProfileFieldsCommand>
{
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(command: UpdateProfileFieldsCommand): Promise<UserDocument> {
    return this.userRepository.findByIdAndUpdate(command.id, {
      $set: {
        bio: command.updateProfileDto.bio,
        gender: command.updateProfileDto.gender,
        username: command.updateProfileDto.username,
        website: command.updateProfileDto.website,
        fullName: command.updateProfileDto.fullName,
      },
    });
  }
}
