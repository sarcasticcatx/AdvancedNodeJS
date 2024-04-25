import { IsString, IsNumber } from "class-validator"


export class UpdateCarDto {
    // @IsNumber()
    // id: number;

    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    year: number;
}