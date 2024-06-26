export interface ICacheService{
    findKey(key:string):any;
    setKey(key:string):void;
    setKeyWithTTL(key:string,ttl:number):void;
}