import { RegisterDto } from 'src/features/auth/dto';

export class RegisterUserCommand {
  constructor(readonly user: RegisterDto) {}
}
