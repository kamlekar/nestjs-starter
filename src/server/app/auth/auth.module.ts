import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthModule } from './jwt/jwt-auth.module';
import { AuthController } from './auth.controller';
import { CognitoOauthModule } from './cognito/cognito-oauth.module';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategy/google.strategy';
import { SessionSerializer } from './utils/serializer';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    JwtAuthModule,
    CognitoOauthModule,
  ],
  providers: [AuthService, GoogleStrategy, SessionSerializer]
})
export class AuthModule {}
