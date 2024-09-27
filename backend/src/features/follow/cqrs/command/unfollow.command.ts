import { UserDocument } from 'src/features/user/schemas';

export class UnfollowCommand {
  constructor(
    public user: UserDocument,
    public id: string,
  ) {}
}
