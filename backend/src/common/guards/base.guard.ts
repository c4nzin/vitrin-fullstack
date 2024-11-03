import { ExecutionContext, Type } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';
import { Request } from 'express';

export function BaseGuard(type: string): Type<IAuthGuard> {
  return class extends AuthGuard(type) {
    public async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
      const result = await super.canActivate(context);

      if (request && result) {
        await super.logIn(request);
      }

      return !!result;
    }
  };
}
