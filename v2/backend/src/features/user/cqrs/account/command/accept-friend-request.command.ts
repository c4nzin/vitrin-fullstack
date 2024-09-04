import { UserDocument } from 'src/features/user/schemas';

export class AcceptFriendRequestCommand {
  constructor(
    public user: UserDocument,
    public requestId: string,
  ) {}
}
