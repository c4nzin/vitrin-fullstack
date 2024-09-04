import { UserDocument } from 'src/features/user/schemas';

export class SendFriendRequestCommand {
  constructor(
    public user: UserDocument,
    public id: string,
  ) {}
}
