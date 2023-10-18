import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { SESSION_COOKIE_KEY } from 'src/server/config/constants';
import { GoogleAuthGuard } from './guard/google.guard';

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
    // const { accessToken } = this.jwtAuthService.login(req.user);
    // TODO: Finalise
    const accessToken = ""
    res.cookie(SESSION_COOKIE_KEY, accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    });
    return res.redirect('/profile');
  }
}
