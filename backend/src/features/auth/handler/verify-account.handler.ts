import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from 'src/features/user/repositories';
import { VerifyAccountCommand } from '../command/verify-account.command';
import { VerifyOtpCommand } from 'src/features/otp/command/verify-otp.command';

@CommandHandler(VerifyAccountCommand)
export class VerifyAccountCommandHandler
  implements ICommandHandler<VerifyAccountCommand>
{
  constructor(
    private readonly userRepository: UserRepository,
    private readonly commandBus: CommandBus,
  ) {}

  public async execute(command: VerifyAccountCommand): Promise<void> {
    await this.commandBus.execute(
      new VerifyOtpCommand(command.otpDto.email, command.otpDto.otpCode),
    );

    await this.userRepository.findOneAndUpdate(
      { email: command.otpDto.email },
      {
        $set: { isEmailVerified: true },
      },
    );
  }
}
