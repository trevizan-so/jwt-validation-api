import { Injectable, Logger } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { decode } from 'jsonwebtoken';

import { JwtPayload } from '../dto/JwtPayload.dto';
import { IJwtService } from './jwt.interface';

@Injectable()
export class JwtService implements IJwtService{
    
    constructor(){}

    private readonly logger = new Logger(JwtService.name);

    public async validateJWT(token: any): Promise<boolean> {

        const obj = this.decodeJwtToJwtPayload(token);

        if(!obj){
            this.logger.log("Invalid JWT")
            return false
        }

        return await this.validateJwtPayloadBody(obj);
    }

    private async validateJwtPayloadBody(payload:JwtPayload){
        const errors = await validate(payload, {whitelist: true, forbidNonWhitelisted: true });
        if(errors.length > 0){
            this.logger.error(`Jwt is not valid, ${errors[0].constraints?.matches?.toLowerCase() || errors[0].constraints?.whitelistValidation?.toLowerCase()}`)
            return false
        }
        return true
    }

    private decodeJwtToJwtPayload(token:string){
        return plainToInstance(JwtPayload,decode(token));
    }
}