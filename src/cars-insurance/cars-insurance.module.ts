import { Module } from '@nestjs/common';
import { CarInsuranceService } from './cars-insurance.service';
import { CarsInsuranceController } from './cars-insurance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Insurance } from './entities/cars-insurance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Insurance])],
  controllers: [CarsInsuranceController],
  providers: [CarInsuranceService],
})
export class CarsInsuranceModule {}
