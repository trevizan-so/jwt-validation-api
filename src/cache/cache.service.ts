import { Injectable, Inject, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { Cache } from "cache-manager";
import { CACHE_MANAGER } from "@nestjs/cache-manager";

import { ICacheService } from "./cache.interface";

@Injectable()
export class CacheService implements ICacheService {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private configService: ConfigService
    ) {}

    private readonly logger = new Logger(CacheService.name);

    async findKey(key: string): Promise<any> {
        return await this.cacheManager.get(key);
    }
    async setKey(key: string, value: any): Promise<void> {
        const defaultTtl = this.configService.get<number>("CACHE_TTL", 10000);
        this.logger.log(`Setting ${key} with value "${value}" to cache`);
        await this.cacheManager.set(key, value, defaultTtl);
    }
    async setKeyWithTTL(key: string, value: any, ttl: number): Promise<void> {
        await this.cacheManager.set(key, value, ttl);
    }
}
