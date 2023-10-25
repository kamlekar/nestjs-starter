import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    ForbiddenException,
   } from '@nestjs/common';
   import { Response } from 'express';
      
   @Catch(ForbiddenException)
   export class RedirectAuthFilter implements ExceptionFilter {
     catch(exception: HttpException, host: ArgumentsHost) {
       const ctx = host.switchToHttp();
       const response = ctx.getResponse<Response>();
       return response.redirect(`/auth/login/google`);
     }
   }