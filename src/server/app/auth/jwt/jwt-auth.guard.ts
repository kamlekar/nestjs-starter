import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<ExpressRequest>();
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    request.session.redirectTo = request.url;

    return request.isAuthenticated();
  }
}
