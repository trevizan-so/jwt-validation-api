import { IsNotEmpty, Matches, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ValidationQuery{
    
    @IsNotEmpty({message: "Please provide a jwt query param"})
    @IsString()
    @Matches(/(^[\w-]*\.[\w-]*\.[\w-]*$)/,{message: "Provided token does not match jwt pattern"})
    @ApiProperty({
        description: "Must be a valid JWT token following the pattern [text].[text].[text]"
    })
    jwt:string;

    constructor(){};

    public getJwt():string{
        return this.jwt;
    }

    public setJwt(jwt:string):void{
        this.jwt = jwt;
    }
}