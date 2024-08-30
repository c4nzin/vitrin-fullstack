import { LoginDto } from 'src/features/auth/dto';

export class LoginUserCommand {
  constructor(readonly user: LoginDto) {}
}
