import { UserDocument } from 'src/features/user/schemas';
import { UpdateEmailDto } from '../dto/update-email.dto';

export class UpdatEmailCommand {
  constructor(
    public updateEmail: UpdateEmailDto,
    public readonly user: UserDocument,
  ) {}
}
