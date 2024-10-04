import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdatEmailCommand } from '../command/update-email.command';
import { UserRepository } from 'src/features/user/repositories';
import { UserDocument } from 'src/features/user/schemas';
import { VerifyOtpCommand } from 'src/features/otp/command/verify-otp.command';

@CommandHandler(UpdatEmailCommand)
export class UpdateEmailCommandHandler implements ICommandHandler<UpdatEmailCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly commandBus: CommandBus,
  ) {}
  public async execute(command: UpdatEmailCommand): Promise<UserDocument> {
    const validateOtp = await this.commandBus.execute(
      new VerifyOtpCommand(command.updateEmail.email, command.updateEmail.otpCode),
    );

    if (!validateOtp) {
      return;
    } else {
      return this.userRepository.findByIdAndUpdate(command.user.id, {
        $set: { email: command.updateEmail.email },
      });
    }
  }
}
