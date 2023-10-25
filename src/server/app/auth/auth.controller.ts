/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guard/google.guard';
import {Request, Response} from "express"

@Controller('auth')
export class AuthController {
  @Get()
  async auth(@Res() res) {
    return res.redirect('/auth/cognito');
  }

  @Get("/login/google")
  @UseGuards(GoogleAuthGuard)
  async loginWithGoogle() {
   return "Google oAuth"
  }

  @Get('/google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // @ts-ignore
    return res.redirect(req.query?.state ?? "/")
  }
}
