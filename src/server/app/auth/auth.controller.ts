import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from 'src/server/common/guards/accessToken.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Get()
  async auth(@Res() res) {
    return res.redirect('/auth/cognito');
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: any) {
    this.authService.logout(req.user['sub']);
  }
}
