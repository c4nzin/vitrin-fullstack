import { UserDocument } from 'src/features/user/schemas';
export declare class DeleteTweetCommand {
    user: UserDocument;
    id: string;
    constructor(user: UserDocument, id: string);
}
