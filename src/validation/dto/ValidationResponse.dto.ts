import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
export class ValidationResponse {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description: "Defines whether the jwt is valid or not according to business specifications",
    })
    validade: string;

    constructor() {}

    public getValidade() {
        return this.validade;
    }

    public setValidade(validade: string) {
        this.validade = validade;
    }
}
