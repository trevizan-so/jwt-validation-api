import { Injectable, Logger } from "@nestjs/common";

import { IValidationService } from "./validation.interface";

import { ValidationInput } from "../dto/ValidationInput.dto";
import { ValidationOutput } from "../dto/ValidationOutput.dto";

import { JwtService } from "../jwt/jwt.service";
import { CacheService } from "../cache/cache.service";
import { TrackingService } from "../tracking/tracking.service";


@Injectable()
export class ValidationService implements IValidationService {
    constructor(
        private jwtService: JwtService,
        private cacheService: CacheService,
        private trackingService: TrackingService
    ) {}

    private readonly logger = new Logger(ValidationService.name);

    async validate(input: ValidationInput): Promise<ValidationOutput> {
        const tokenKey = this.createCacheKey(input);

        const cachedValue = await this.cacheService.findKey(tokenKey);

        let isJWTValid = cachedValue;

        if (cachedValue === undefined) {
            this.logger.log("Jwt token not found in cache");
            isJWTValid = await this.jwtService.validateJWT(input.jwt);

            this.logger.log("Setting to cache");
            this.cacheService.setKey(tokenKey, isJWTValid);
        } else {
            this.logger.log(`Found value in Cache : ${cachedValue}`);
        }
        return new ValidationOutput(isJWTValid);
    }

    private createCacheKey(input: ValidationInput) {
        return `JWT_KEY:${input.jwt}`;
    }
}
