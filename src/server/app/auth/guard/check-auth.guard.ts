import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import {Request} from "express"

@Injectable()
export class CheckAuthGuard implements CanActivate {
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest<Request>()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        request.session.redirectTo = request.url
        return request.isAuthenticated()
    }
}