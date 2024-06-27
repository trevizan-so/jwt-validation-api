import { Injectable, Logger } from '@nestjs/common';
import { IJwtService } from './jwt.interface';
import { decode } from 'jsonwebtoken';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { JwtPayload } from '../dto/JwtPayload.dto';


@Injectable()
export class JwtService implements IJwtService{
    
    constructor(){}

    private readonly logger = new Logger(JwtService.name);

    public async validateJWT(token: any): Promise<boolean> {

        const obj = this.decodeJwtToJwtPayload(token);

        if(!obj){
            this.logger.log("Invalid JWT") // TODO: mudar para classe de logger
            return false
        }

        return await this.validateJwtPayloadBody(obj);
    }

    private async validateJwtPayloadBody(payload:JwtPayload){
        const errors = await validate(payload, {whitelist: true, forbidNonWhitelisted: true });
        if(errors.length > 0){
            this.logger.error(`Jwt is not valid, ${errors[0].constraints?.matches?.toLowerCase() || errors[0].constraints?.whitelistValidation?.toLowerCase()}`) // TODO: mudar para classe de logger
            return false
        }
        return true
    }

    private decodeJwtToJwtPayload(token:string){
        return plainToInstance(JwtPayload,decode(token));
    }
}