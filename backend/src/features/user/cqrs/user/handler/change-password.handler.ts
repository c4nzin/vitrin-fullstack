import { CommandBus, CommandHandler, ICommandBus, ICommandHandler } from '@nestjs/cqrs';
import { ChangePasswordCommand } from '../command/change-password.command';
import { VerifyOtpCommand } from 'src/features/otp/cqrs';
import bcrypt from 'bcrypt';
import { UserDocument } from 'src/features/user/schemas';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordCommandHandler
  implements ICommandHandler<ChangePasswordCommand>
{
  constructor(private readonly commandBus: CommandBus) {}

  public async execute(command: ChangePasswordCommand): Promise<UserDocument> {
    const { changePasswordDto, user } = command;

    const validateOtp = await this.commandBus.execute(
      new VerifyOtpCommand(user.email, changePasswordDto.otpCode),
    );

    await this.isSamePassword(changePasswordDto.newPassword, user.password);

    if (!validateOtp) {
      return;
    } else {
      const hashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);

      return user.updateOne({ password: hashedPassword });
    }
  }

  private async isSamePassword(
    newPassword: string,
    oldPassword: string,
  ): Promise<boolean> {
    const isSamePass = await bcrypt.compare(newPassword, oldPassword);

    if (isSamePass) {
      throw new BadRequestException('You cant provide same password.');
    }

    return false;
  }
}
