import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IValidationService } from './validation.interface';

import { ValidationInput } from '../dto/ValidationInput.dto';
import { JwtService } from '../jwt/jwt.service';
import { CacheService } from '../cache/cache.service';
import { TrackingService } from '../tracking/tracking.service';

import { ValidationOutput } from '../dto/ValidationOutput.dto';

@Injectable()
export class ValidationService implements IValidationService{
    
    constructor(
      private jwtService:JwtService,
      private cacheService:CacheService,
      private configService: ConfigService,
      private trackingService: TrackingService
    ){}

    private readonly logger = new Logger(ValidationService.name);

   async validate(input: ValidationInput): Promise<ValidationOutput> {

        const tokenKey = this.createCacheKey(input);
        const cacheHit = this.cacheService.findKey(tokenKey);

        let isJWTValid = cacheHit;

        if(!cacheHit){
            this.logger.log("Token not found in cache")
            isJWTValid = await this.jwtService.validateJWT(input.jwt);
            this.cacheService.setKey(tokenKey, isJWTValid);
        }

        return new ValidationOutput(isJWTValid);
   }

   private createCacheKey(input:ValidationInput){
        return  `JWT_KEY:${input.jwt}`
   }
}