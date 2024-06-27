import { IsNotEmpty, Matches,  IsIn, IsString, MaxLength, ValidateIf, IsNumberString } from 'class-validator';
import { checkIfIsPrime } from '../utils/type-format-validation';
import { ApiProperty } from '@nestjs/swagger';

export class JwtPayload{
    @IsNotEmpty()
    @IsString()
    @Matches(/^[^0-9]*$/, {message: "Name must not contain any number"})
    @MaxLength(256)
    @ApiProperty({
        description: 'Must not contain any numeric character',
      })
    Name:string;

    @IsNotEmpty()
    @IsIn(["Admin","Member", "External"])
    @ApiProperty(
        {
            description: 'Must be one of "Admin", "Member" or "External"',
        }
    )
    Role:string;
 
    @IsNotEmpty()
    @IsNumberString()
    @ValidateIf(n => checkIfIsPrime(n), {message:"Seed must me an prime number"})
    @ApiProperty({
        description: 'Must be a prime number',
    })
    Seed:number;
}