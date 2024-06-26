import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IJwtService } from './jwt.interface';


@Injectable()
export class JwtService implements IJwtService{
    
    constructor(){}

    public validateJWT(token: any): boolean {
        return true
    }

}