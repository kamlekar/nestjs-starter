import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleOauthGuard } from './google-oauth.guard';
import { JwtAuthService } from '../jwt/jwt-auth.service';
import {
  SESSION_COOKIE_KEY,
  SESSION_REFRESH_COOKIE_KEY,
} from 'src/server/config/constants';
import { AuthService } from '../auth.service';

@Controller('auth/google')
export class GoogleOauthController {
  constructor(
    private jwtAuthService: JwtAuthService,
    private authService: AuthService,
  ) {}

  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() _req) {
    // Guard redirects
  }

  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user;
    const { accessToken, refreshToken } = this.jwtAuthService.login(req.user);
    res.cookie(SESSION_COOKIE_KEY, accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    });
    res.cookie(SESSION_REFRESH_COOKIE_KEY, refreshToken, {
      httpOnly: true,
      sameSite: 'lax',
    });
    await this.authService.updateRefreshToken(user.id.toString(), refreshToken);
    return res.redirect('/profile');
  }
}
