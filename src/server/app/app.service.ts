import { Injectable, Req } from '@nestjs/common';
import { Request as ExpressRequest } from 'express';

@Injectable()
export class AppService {
  getHello(@Req() req: ExpressRequest): string {
    return `
      <div>
        <h1>Hello from NestJS!</h1>
      </div>
      ${!req.isAuthenticated() ? `
      <aside>
        <a href="/auth/login">Login</a>
      </aside>
      `: ''}
    `;
  }
}
