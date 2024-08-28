import { UserDocument } from 'src/features/user/schemas';
export declare class FollowCommand {
    user: UserDocument;
    targetId: string;
    constructor(user: UserDocument, targetId: string);
}
