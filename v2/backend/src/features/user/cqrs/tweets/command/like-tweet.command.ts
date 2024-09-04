import { UserDocument } from 'src/features/user/schemas';

export class LikeTweetCommand {
  constructor(
    public user: UserDocument,
    public id: string,
  ) {}
}
