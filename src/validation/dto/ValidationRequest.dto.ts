import { IsNotEmpty, Matches,  IsIn, IsString, MaxLength, ValidateIf, IsNumberString } from 'class-validator';
export class ValidationRequest{
    @IsNotEmpty()
    @IsString()
    @Matches(/(^[\w-]*\.[\w-]*\.[\w-]*$)/,{message: "Provided token does not match jwt pattern"})
    jwt:string;

    constructor(){};

    public getJwt():string{
        return this.jwt;
    }

    public setJwt(jwt:string):void{
        this.jwt = jwt;
    }
}