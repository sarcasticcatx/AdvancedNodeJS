import { Controller, Get, Body, Param, Patch, Post, Res, Delete } from "@nestjs/common";
import { CarsService } from "./cars.service";
import { Response } from "express";
import { CreateCarDto } from "./dtos/create.car.dto";
import { UpdateCarDto } from "./dtos/update.car.dto";

@Controller("cars")
export class CarsController {
    constructor(private carsService: CarsService) {}

    @Get()
    getAllCars(){
        return this.carsService.getAllCars();

    }

    @Get(":id")
    getCarById(@Param("id") cardId: string) {
        return this.carsService.getCarById(cardId)
    }

    @Post()
    createCar(@Body() body: CreateCarDto) {
        return this.carsService.createCar(body)
    }
    @Patch(":id")
    updateCar(
        @Param("id") carId: string, 
        @Body() updateData: UpdateCarDto) {
        return this.carsService.updateCar(carId, updateData)
    }
    @Delete(":id")
    async deleteCar(
        @Res() res: Response, 
        @Param("id") cardId: string) {
            await this.carsService.deleteCar(cardId); 
            //ovde iam problem u postman brishe sve osven id-to sho go stavam

            res.sendStatus(204)

        }
}