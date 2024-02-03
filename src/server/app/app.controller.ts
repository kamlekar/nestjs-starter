import {
  Controller,
  Get,
  Request,
  UseGuards,
  Req,
  UseFilters,
} from '@nestjs/common';

import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';
import { RedirectAuthFilter } from './auth/filter/refresh-auth.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(@Req() req: ExpressRequest): string {
    return this.appService.getHello(req);
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(RedirectAuthFilter)
  @Get('private')
  getPrivate(@Request() req) {
    return req.user;
  }
}
