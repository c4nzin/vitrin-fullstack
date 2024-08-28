import { UpdateEmailDto } from 'src/features/user/dto';
import { UserDocument } from 'src/features/user/schemas';
export declare class UpdatEmailCommand {
    updateEmail: UpdateEmailDto;
    readonly user: UserDocument;
    constructor(updateEmail: UpdateEmailDto, user: UserDocument);
}
