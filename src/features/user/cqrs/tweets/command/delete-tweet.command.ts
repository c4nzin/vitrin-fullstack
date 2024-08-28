import { UserDocument } from 'src/features/user/schemas';

export class DeleteTweetCommand {
  constructor(
    public user: UserDocument,
    public id: string,
  ) {}
}
