import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {} 

  @Get()
  getAllCars() {
    return this.carsService.getAllCars();
  }

  @Get(":id")
  getCarById(@Param("id") carId: string) {
    return this.carsService.getCarById(carId)
  }
    
  @Post() 
  createCar(@Body() carData: CreateCarDto) {
    return this.carsService.createCar(carData)
  }

  @Patch(":id")
  updateCar(@Param("id") carId: string, @Body() updateData: UpdateCarDto) {
    return this.carsService.updateCar(carId, updateData)
  }
  @Delete(":id")
  deleteCar(@Param("id") carId: string) {
    return this.carsService.deleteCar(carId)
  }

  }

