import { IsNumber ,IsString,} from "class-validator";
import { CreateCarsInsuranceDto } from "src/cars-insurance/dto/create-cars-insurance.dto";
import { CreateManufacturerDto } from "src/manifacturer/dto/create-manufacturer.dto";

export class CreateCarDto {
    @IsString()
    make: string;
  
    @IsString()
    model: string;
  
    @IsNumber()
    year: number;
 
    @IsString()
    manufacturer: CreateManufacturerDto;

    @IsString()
    insurance: CreateCarsInsuranceDto;
}
