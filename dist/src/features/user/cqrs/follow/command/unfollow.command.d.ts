import { UserDocument } from 'src/features/user/schemas';
export declare class UnfollowCommand {
    user: UserDocument;
    id: string;
    constructor(user: UserDocument, id: string);
}
