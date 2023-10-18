import { Controller, Get, Res, UseGuards } from '@nestjs/common';
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
  async googleAuthRedirect() {
    return { msg: 'Success' };
  }
}
