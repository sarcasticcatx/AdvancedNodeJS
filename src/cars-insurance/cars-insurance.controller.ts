import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarInsuranceService } from './cars-insurance.service';
import { CreateCarsInsuranceDto } from './dto/create-cars-insurance.dto';
import { UpdateCarsInsuranceDto } from './dto/update-cars-insurance.dto';

@Controller('cars-insurance')
export class CarsInsuranceController {
  constructor(private readonly carInsuranceService: CarInsuranceService) {}

  @Get()
  getAllCarInsurances() {
    return this.carInsuranceService.getAllCarInsurances();
  }

@Post()
createInsurance(@Body() createCarsInsuranceDto: CreateCarsInsuranceDto) {
    return this.carInsuranceService.createInsurance(createCarsInsuranceDto); 
    //i fukcing cant
  }
  
  @Get(':id') //find car insurance by id
  findOne(@Param('id') id: string) {
    return this.carInsuranceService.findOne(id);
  }

}
