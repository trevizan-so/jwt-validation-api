export class ValidationRequest{
    jwt:string;

    constructor(){};

    public getJwt():string{
        return this.jwt;
    }

    public setJwt(jwt:string):void{
        this.jwt = jwt;
    }
}