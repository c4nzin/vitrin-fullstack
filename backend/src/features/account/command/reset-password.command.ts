import { ResetPasswordDto } from '../dto/reset-password.dto';

export class ResetPasswordCommand {
  constructor(public resetPasswordDto: ResetPasswordDto) {}
}
