import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import expressSession from "express-session"
import passport from "passport"
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const pg = require("connect-pg-simple")
import { ServerModule } from 'src/server/server.module';

// const pgPool = new pg.Pool({
//   user: process.env.DATABASE_USER,
//   password: process.env.DATABASE_USER,
//   host: process.env.DATABASE_HOST,
//   port: process.env.DATABASE_PORT,
//   database: "postgres"
// });

async function bootstrap() {
  const app = await NestFactory.create(ServerModule);
  app.use(cookieParser());
  app.use(expressSession({
    secret: process.env.JWT_SECRET,
    saveUninitialized: false,
    // store: new pg({pool: pgPool, tableName: "session"}),
    resave: false,
    cookie: {
      maxAge: 180000
    }
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
