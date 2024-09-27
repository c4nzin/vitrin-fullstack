import { LoginDto } from 'src/features/auth/dto';

export class LoginUserCommand {
  constructor(public readonly user: LoginDto) {}
}
