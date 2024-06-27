import { CanActivate, ExecutionContext, Injectable, UnauthorizedException, Logger } from "@nestjs/common";

import { Request } from "express";

import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private configService: ConfigService) {}

    private readonly logger = new Logger(AuthGuard.name);

    async canActivate(context: ExecutionContext): Promise<boolean> {
        
        const validationToken = this.configService.get<string>("BASIC_TOKEN");

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            this.logger.log("Authorization token not provided")
            throw new UnauthorizedException();
        }
        if(token == validationToken){
            this.logger.log("Token authenticated")
            return true
        }
        return false;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(" ") ?? [];
        return type === "Bearer" ? token : undefined;
    }
}
