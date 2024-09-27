import { PageOptionsDto } from 'src/common/pagination/dto';
import { UserDocument } from 'src/features/user/schemas';

export class FetchRequestCommand {
  constructor(
    public user: UserDocument,
    public pagination: PageOptionsDto,
  ) {}
}
