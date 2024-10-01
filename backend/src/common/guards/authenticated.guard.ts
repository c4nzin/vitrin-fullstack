import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthenticatedContext } from '../contexts/authenticated.context';
import { RequestContext } from '@medibloc/nestjs-request-context';
import { UserDocument } from 'src/features/user/schemas';
// import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor() {} // private readonly reflector: Reflector

  public canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    // const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());

    if (!request.isAuthenticated()) {
      throw new UnauthorizedException('Unauthorized user');
    }

    const authenicatedUser = RequestContext.get<AuthenticatedContext>();

    authenicatedUser.user = request.user as UserDocument;

    return true;
  }
}
