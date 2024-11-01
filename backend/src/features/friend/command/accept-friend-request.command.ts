import { UserDocument } from 'src/features/user/schemas';

export class AcceptFriendRequestCommand {
  constructor(
    public readonly requestId: string,
    public readonly user: UserDocument,
  ) {}
}
