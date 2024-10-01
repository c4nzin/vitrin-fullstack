import { ResetPasswordDto } from 'src/features/user/dto';
import { UserDocument } from 'src/features/user/schemas';

export class ResetPasswordCommand {
  constructor(public resetPasswordDto: ResetPasswordDto) {}
}
