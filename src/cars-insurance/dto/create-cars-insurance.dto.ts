import { IsArray, IsString, Max, Min } from "class-validator";

export class CreateCarsInsuranceDto {
    @IsString()
    policyNumber:string;

    @IsString()
    provider:string;

    @IsString()
    coverageDetails:string;

    @IsString()
    cars: string;
}

