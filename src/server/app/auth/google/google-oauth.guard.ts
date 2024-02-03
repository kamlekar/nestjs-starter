import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';

@Injectable()
export class GoogleOauthGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext) {
    const activate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest<ExpressRequest>();
    // @ts-expect-error: redirectTo should work
    request.query.state = request.session.redirectTo;
    await super.logIn(request);
    return activate;
  }
}
