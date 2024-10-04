import { LoginUserHandler } from './login-user.handler';
import { RegisterUserHandler } from './register-user.handler';
import { VerifyAccountCommandHandler } from './verify-account.handler';

export const allAuthHandlers = [
  LoginUserHandler,
  RegisterUserHandler,
  VerifyAccountCommandHandler,
];
