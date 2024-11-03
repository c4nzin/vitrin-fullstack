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
    private readonly commandBus: CommandBus,
    @Inject(ENV) private readonly config: Config,
  ) {}

  public async execute(command: ChangePasswordCommand): Promise<UserDocument> {
    const { changePasswordDto, user } = command;

    const validateOtp = await this.commandBus.execute(
      new VerifyOtpCommand(user.email, changePasswordDto.otpCode),
    );

    await this.isSamePassword(changePasswordDto.newPassword, user.password);

    if (!validateOtp) {
      return;
    } else {
      const hashedPassword = await bcrypt.hash(
        changePasswordDto.newPassword,
        this.config.HASH_SALT_ROUNDS,
      );

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
