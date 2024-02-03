import {
  Controller,
  Get,
  Res,
  Req,
  UseGuards,
  UseFilters,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { parse } from 'url';
import { JwtAuthGuard } from '../app/auth/jwt/jwt-auth.guard';

import { ViewService } from './view.service';
import { ViewAuthFilter } from '../app/auth/jwt/jwt-auth.filter';
import { RedirectAuthFilter } from '../app/auth/filter/refresh-auth.filter';

@Controller('/')
export class ViewController {
  constructor(private viewService: ViewService) {}

  async handler(req: Request, res: Response) {
    const parsedUrl = parse(req.url, true);
    await this.viewService
      .getNextServer()
      .render(req, res, parsedUrl.pathname, parsedUrl.query);
  }

  @Get('home')
  public async showHome(@Req() req: Request, @Res() res: Response) {
    const parsedUrl = parse(req.url, true);
    const serverSideProps = { dataFromController: '123' };

    await this.viewService
      .getNextServer()
      .render(
        req,
        res,
        parsedUrl.pathname,
        Object.assign(parsedUrl.query, serverSideProps),
      );
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(RedirectAuthFilter)
  @Get('profile')
  public async showProfile(@Req() req: Request, @Res() res: Response) {
    await this.handler(req, res);
  }

  @UseGuards(JwtAuthGuard)
  @UseFilters(RedirectAuthFilter)
  @Get('admin')
  public async showAdmin(@Req() req: Request, @Res() res: Response) {
    const parsedUrl = parse(req.url, true);
    await this.viewService
      .getNextServer()
      .render(req, res, parsedUrl.pathname, parsedUrl.query);
  }

  @Get('orders')
  @UseGuards(JwtAuthGuard)
  @UseFilters(ViewAuthFilter)
  public async indexOrders(@Req() req: Request, @Res() res: Response) {
    await this.handler(req, res);
  }

  @Get('_next*')
  public async assets(@Req() req: Request, @Res() res: Response) {
    const parsedUrl = parse(req.url, true);
    await this.viewService
      .getNextServer()
      .render(req, res, parsedUrl.pathname, parsedUrl.query);
  }
}
