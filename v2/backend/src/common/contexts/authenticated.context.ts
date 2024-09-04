import { RequestContext } from '@medibloc/nestjs-request-context';
import { UserDocument } from 'src/features/user/schemas/user.schema';

export class AuthenticatedContext extends RequestContext {
  public user: UserDocument;
}
