import { PartialType } from '@nestjs/mapped-types';
import { CreateCarsInsuranceDto } from './create-cars-insurance.dto';

export class UpdateCarsInsuranceDto extends PartialType(CreateCarsInsuranceDto) {}
