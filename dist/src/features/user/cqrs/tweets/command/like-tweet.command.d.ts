import { UserDocument } from 'src/features/user/schemas';
export declare class LikeTweetCommand {
    user: UserDocument;
    id: string;
    constructor(user: UserDocument, id: string);
}
