import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateProfileFieldsCommand } from '../command/update-profile.command';
import { UserRepository } from 'src/features/user/repositories';
import { UserDocument } from 'src/features/user/schemas';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(UpdateProfileFieldsCommand)
export class UpdateProfileFieldsCommandHandler
  implements ICommandHandler<UpdateProfileFieldsCommand>
{
  constructor(private readonly userRepository: UserRepository) {}

  public async execute(command: UpdateProfileFieldsCommand): Promise<UserDocument> {
    const { id, updateProfileDto } = command;

    const updatedFields = Object.fromEntries(
      Object.entries(updateProfileDto).filter(([key, value]) => value != null),
    );

    if (Object.keys(updatedFields).length === 0) {
      throw new BadRequestException('No fields to update.');
    }

    const updatedUser = await this.userRepository.findByIdAndUpdate(id, {
      $set: updatedFields,
    });

    if (!updatedUser) {
      throw new BadRequestException('No user found to update.');
    }

    return updatedUser;
  }
}
