import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IJwtService } from './jwt.interface';
import { decode, verify } from 'jsonwebtoken';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { JwtPayload } from '../dto/JwtPayload.dto';


@Injectable()
export class JwtService implements IJwtService{
    
    constructor(){}

    public async validateJWT(token: any): Promise<boolean> {
        const obj = this.decodeJwtToJwtPayload(token);
        if(!obj){
            console.log("INVALID JWT") // TODO: mudar para classe de logger
            return false
        }

        return await this.validateJwtPayloadBody(obj);
    }

    private async validateJwtPayloadBody(payload:JwtPayload){
        const errors = await validate(payload);
        if(errors.length > 0){
            console.log(errors[0].constraints) // TODO: mudar para classe de logger
            return false
        }
        return true
    }

    private decodeJwtToJwtPayload(token:string){
        return plainToInstance(JwtPayload,decode(token));
    }
}