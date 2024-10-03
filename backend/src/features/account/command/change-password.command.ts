import { UserDocument } from 'src/features/user/schemas';
import { ChangePasswordDto } from '../dto/change-password.dto';

export class ChangePasswordCommand {
  constructor(
    public user: UserDocument,
    public changePasswordDto: ChangePasswordDto,
  ) {}
}
