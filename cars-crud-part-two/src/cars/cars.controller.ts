import { Controller, Get, Body, Param, Patch, Post, Delete, Query } from "@nestjs/common";
import { CarsService } from "./cars.service";
import { CreateCarDto } from "./dtos/create.car.dto";
import { UpdateCarDto } from "./dtos/update.car.dto";
import { CarsFilters } from "./interface/cars.filters.interface";

@Controller("cars")
export class CarsController {
    constructor(private carsService: CarsService) {}

    @Get()
    getAllCars( 
        @Query("searchByMake") searchByMake: string,
        @Query("searchByModel") searchByModel: string,
        @Query("searchByYear") searchByYear: number,
    ) {
        const filters: CarsFilters = {
            searchByMake,
            searchByModel,
            searchByYear
        };

        return this.carsService.getAllCars(filters)
    }
    @Get(":id")
    getCarById(@Param("id") id: string) {
        return this.carsService.getCarById(Number(id));
    }
    @Post()
    createCar(@Body() carData: CreateCarDto) {
        return this.carsService.createCar(carData)
    }
    @Patch(":id")
    updateCar(
        @Param("id") carId: string,
        @Body() updateData: UpdateCarDto,
    ) {
        return this.carsService.updateCar(Number(carId), updateData);
    }
    @Delete(":id")
    deleteCar(
        @Param("id") cardId: string) {
            return this.carsService.deleteCar(Number(cardId))
        }
}