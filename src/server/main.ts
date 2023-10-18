import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as session from "express-session"
import * as passport from "passport"

import { ServerModule } from 'src/server/server.module';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);
  app.use(cookieParser());
  app.use(session({
    secret: process.env.JWT_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000
    }
  }))
  app.use(passport.session())
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
