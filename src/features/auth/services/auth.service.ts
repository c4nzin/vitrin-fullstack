import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/features/user/repositories';
import { LoginDto, RegisterDto } from '../dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  public async validateUser(username: string, password: string) {
    const user = await this.userRepository.findByUsername(username);

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

  public async register(registerDto: RegisterDto) {
    const user = await this.userRepository.findByUsernameAndEmail(
      registerDto.username,
      registerDto.email,
    );

    if (user) {
      throw new BadRequestException('User is already registered.');
    }

    return this.userRepository.create(registerDto);
  }
}
