import { Controller, Req, Get, UseGuards, UseFilters } from '@nestjs/common';

import { AppService } from './app.service';
import { RedirectAuthFilter } from './auth/filter/redirect-auth.filter';
import { CheckAuthGuard } from './auth/guard/check-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(CheckAuthGuard)
  @UseFilters(RedirectAuthFilter)
  @Get('/private')
  getPrivate(@Req() req) {
    return req?.user
  }
}
