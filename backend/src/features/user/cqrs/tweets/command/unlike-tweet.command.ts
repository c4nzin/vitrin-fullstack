import { UserDocument } from 'src/features/user/schemas';

export class UnlikeTweetCommand {
  constructor(
    public user: UserDocument,
    public id: string,
  ) {}
}
