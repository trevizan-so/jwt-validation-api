import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ICacheService } from './cache.interface';


@Injectable()
export class CacheService implements ICacheService{
    
    constructor(){}

    findKey(key:string):any{
        return false
    };
    setKey(key:string, value:any):void{};
    setKeyWithTTL(key:string,ttl:number):void{};

}