import { RequestContext } from '@medibloc/nestjs-request-context';
import { UserDocument } from 'src/features/user/schemas/user.schema';
export declare class AuthenticatedContext extends RequestContext {
    user: UserDocument;
}
