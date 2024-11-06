import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ChangePasswordCommand } from '../command/change-password.command';
import bcrypt from 'bcrypt';
import { UserDocument } from 'src/features/user/schemas';
import { BadRequestException, Inject } from '@nestjs/common';
import { Config, ENV } from 'src/config/config';
import { VerifyOtpCommand } from 'src/features/otp/command/verify-otp.command';

@CommandHandler(ChangePasswordCommand)
export class ChangePasswordCommandHandler
  implements ICommandHandler<ChangePasswordCommand>
{
  constructor(
    @Inject(ENV) private readonly config: Config,
    private readonly commandBus: CommandBus,
  ) {}

  public async execute(command: ChangePasswordCommand): Promise<UserDocument> {
    const { changePasswordDto, user } = command;

    const validateOtp = await this.commandBus.execute(
      new VerifyOtpCommand(user.email, changePasswordDto.otpCode),
    );

    if (!validateOtp) {
      throw new BadRequestException('Invalid OTP.');
    }

    await this.isSamePassword(changePasswordDto.newPassword, user.password);

    const hashedPassword = await bcrypt.hash(
      changePasswordDto.newPassword,
      this.config.HASH_SALT_ROUNDS,
    );

    const updateResult = await user.updateOne({ password: hashedPassword });

    if (updateResult.modifiedCount > 0) {
      return user;
    } else {
      throw new BadRequestException('Failed to change password');
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
