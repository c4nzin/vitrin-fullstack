import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UserRepository } from 'src/features/user/repositories';
import { LoginDto } from 'src/features/auth/dto';
import { BadRequestException } from '@nestjs/common';
import { UserDocument } from 'src/features/user/schemas';
import { LoginUserCommand } from '../..';

@CommandHandler(LoginUserCommand)
export class LoginUserHandler implements ICommandHandler<LoginUserCommand> {
  constructor(private readonly userRepository: UserRepository) {}
  public async execute(command: LoginUserCommand): Promise<any> {
    await this.login(command.user);
    return this.validateUser(command.user.username, command.user.password);
  }

  public async validateUser(
    username: string,
    password: string,
  ): Promise<UserDocument | null> {
    const user = await this.userRepository.findByUsername(username);

    if (!user) {
      throw new BadRequestException('No user found.');
    }

    const isValidPassword = await this.userRepository.isCorrectPassword(
      password,
      user.password,
    );

    if (user && isValidPassword) {
      return user;
    }

    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public async login(loginDto: LoginDto) {}
}
