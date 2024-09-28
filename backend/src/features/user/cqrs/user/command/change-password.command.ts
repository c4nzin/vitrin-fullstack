import { ChangePasswordDto } from 'src/features/user/dto';
import { UserDocument } from 'src/features/user/schemas';

export class ChangePasswordCommand {
  constructor(
    public user: UserDocument,
    public changePasswordDto: ChangePasswordDto,
  ) {}
}
