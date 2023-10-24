import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { GoogleOauthModule } from './google/google-oauth.module';
import { JwtAuthModule } from './jwt/jwt-auth.module';
import { AuthController } from './auth.controller';
import { CognitoOauthModule } from './cognito/cognito-oauth.module';
import { SessionSerializer } from './utils/serializer';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    GoogleOauthModule,
    JwtAuthModule,
    CognitoOauthModule,
  ],
  providers: [SessionSerializer, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
