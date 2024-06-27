
export interface IJwtService{
    validateJWT(token:any):Promise<Boolean>;
}