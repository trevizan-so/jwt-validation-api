export interface ICacheService{
    findKey(key:string):any;
    setKey(key:string, value:any):void;
    setKeyWithTTL(key:string,value:any, ttl:number):void;
}