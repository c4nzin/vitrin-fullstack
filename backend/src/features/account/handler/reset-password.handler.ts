import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ResetPasswordCommand } from '../command/reset-password.command';
import { UserRepository } from 'src/features/user/repositories';
import { BadRequestException, Inject } from '@nestjs/common';
import { UserDocument } from 'src/features/user/schemas';
import bcrypt from 'bcrypt';
import { Config, ENV } from 'src/config/config';
import { VerifyOtpCommand } from 'src/features/otp/command/verify-otp.command';

@CommandHandler(ResetPasswordCommand)
export class ResetPasswordCommandHandler
  implements ICommandHandler<ResetPasswordCommand>
{
  constructor(
    private readonly commandBus: CommandBus,
    private readonly userRepository: UserRepository,
    @Inject(ENV) private readonly config: Config,
  ) {}

  public async execute(command: ResetPasswordCommand): Promise<UserDocument | null> {
    const { resetPasswordDto } = command;

    const validatedOtp = await this.commandBus.execute(
      new VerifyOtpCommand(resetPasswordDto.email, resetPasswordDto.otpCode),
    );

    if (!validatedOtp) {
      throw new BadRequestException('Invalid OTP.');
    }

    const user = await this.userRepository.findByEmail(resetPasswordDto.email);

    const hashedPassword = await bcrypt.hash(
      resetPasswordDto.newPassword,
      this.config.HASH_SALT_ROUNDS,
    );

    const updateResult = await user.updateOne({ password: hashedPassword });

    if (!updateResult.modifiedCount) {
      throw new BadRequestException('Something went wrong while resetting the password.');
    }

    return user;
  }
}
