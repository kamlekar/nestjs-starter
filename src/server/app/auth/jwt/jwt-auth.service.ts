import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../../users/user.entity';
import { JwtPayload } from './jwt-auth.strategy';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  login(user: User) {
    const payload: JwtPayload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    };
  }
}
