import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import passport from 'passport';
import { ServerModule } from 'src/server/server.module';

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);
  app.use(cookieParser());

  app.use(
    expressSession({
      secret: process.env.SESSION_SECRET,
      saveUninitialized: false,
      rolling: true,
      resave: false,
      cookie: {
        maxAge: 60000,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
