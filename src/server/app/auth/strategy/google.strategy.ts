import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    super({
      clientID: configService.get('OAUTH_GOOGLE_ID'),
      clientSecret: configService.get('OAUTH_GOOGLE_SECRET'),
      callbackURL: configService.get('OAUTH_GOOGLE_REDIRECT_URL'),
      scope: ['profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { id, name, emails } = profile;
    let user = await this.usersService.findOne({
      where: { provider: 'google', providerId: id },
    });
    if (!user) {
      user = await this.usersService.create({
        provider: 'google',
        providerId: id,
        name: name.givenName,
        username: emails[0].value,
      });
    }
    return user;
  }
}
