import { IsNotEmpty, Matches,  IsIn, IsString, MaxLength, ValidateIf, IsNumberString } from 'class-validator';
import { checkIfIsOdd } from '../utils/type-format-validation';

export class JwtPayload{
    @IsNotEmpty()
    @IsString()
    @Matches(/^[^0-9]*$/, {message: "Name must not contain any number"})
    @MaxLength(256)
    Name:string;

    @IsNotEmpty()
    @IsIn(["Admin","Member", "External"])
    Role:string;
 
    @IsNotEmpty()
    @IsNumberString()
    @ValidateIf(n => checkIfIsOdd(n), {message:"Seed must me an odd number"})
    Seed:number;
}