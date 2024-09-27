import { UpdateEmailDto } from 'src/features/user/dto';
import { UserDocument } from 'src/features/user/schemas';

export class UpdatEmailCommand {
  constructor(
    public updateEmail: UpdateEmailDto,
    public readonly user: UserDocument,
  ) {}
}
