import { UserRepository } from 'src/features/user/repositories';
import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserDocument } from 'src/features/user/schemas';
import { BadRequestException } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { EMAIL_QUEUE, USER_REGISTERED } from 'src/modules/email/services';
import { Queue } from 'bull';
import { RegisterUserCommand } from '../command/register-user.command';
import { GenerateOtpCommand } from 'src/features/otp/command/generate-otp.command';

@CommandHandler(RegisterUserCommand)
export class RegisterUserHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly commandBus: CommandBus,
    @InjectQueue(EMAIL_QUEUE) private readonly emailQueue: Queue,
  ) {}

  public async execute(command: RegisterUserCommand): Promise<UserDocument> {
    const user = await this.userRepository.findByUsernameOrEmail(
      command.user.username,
      command.user.email,
    );

    if (user) {
      throw new BadRequestException('User is already registered.');
    }

    const otp = await this.commandBus.execute(new GenerateOtpCommand(command.user.email));

    const result = await this.userRepository.executeTransaction(async (session) => {
      const createdUser = await this.userRepository.create(command.user, session);

      await this.emailQueue.add(
        USER_REGISTERED,
        {
          email: command.user.email,
          username: command.user.username,
          otp,
        },
        { lifo: false, delay: 10000, priority: 1 },
      );

      return createdUser;
    });

    return result;
  }
}
