import { IsNumber, IsString } from "class-validator";

export class CreateCarDto {
    // @IsNumber()
    // id: number; 

    @IsString()
    make: string;
    
    @IsString()
    model: string;

    @IsNumber()
    year: number;

    
}