import { UserDocument } from 'src/features/user/schemas';

export class FollowCommand {
  constructor(
    public user: UserDocument,
    public targetId: string,
  ) {}
}
