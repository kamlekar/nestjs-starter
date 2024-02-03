import { Controller, Get, Res } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Get()
  async auth(@Res() res) {
    return res.redirect('/auth/cognito');
  }

  @Get('/login')
  async loginPage() {
    return `
      <div><a href='/auth/google'>Login</a></div>
      <div><a href='/auth/google'>Signup</a></div>
    `;
  }
}
