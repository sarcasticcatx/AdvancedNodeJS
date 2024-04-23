import { Injectable, NotFoundException } from "@nestjs/common";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { Cars } from "./interface/cars.interface";
import { CreateCarDto } from "./dtos/create.car.dto";
import { UpdateCarDto } from "./dtos/update.car.dto";
import { v4 as uuid } from "uuid"

//ne trebase tuka uuid ali nesho ne mi raboteshe ko sho treba i morav da go staam
@Injectable()
export class CarsService {
    //get all / retrive all cars
       async getAllCars() {
        const carsJSON = await readFile(
            join(process.cwd(), "src", "cars", "data", "cars.json"),
      "utf-8"
        );

        const cars: Cars[] = JSON.parse(carsJSON);

        return cars;
       }
       //save all
       async saveCars(cars: Cars[]) {
        await writeFile(
            join(process.cwd(),"src", "cars", "data", "cars.json" ),
            JSON.stringify(cars, null, 2),
            "utf-8"
        );

       }
       //get car by id / retrive car by id 
       async getCarById(carId: string) {
        const cars = await this.getAllCars();

        const foundCar = cars.find(car => car.id === carId);

        if (!foundCar) throw new NotFoundException("Car not found");

        return foundCar;
       }

       //add a new car / create 
       async createCar(carData: CreateCarDto) {
        const cars = await this.getAllCars();

        const newCar: Cars = { id: uuid(), ...carData} //put uuid here 

        cars.push(newCar);

        await this.saveCars(cars);

        return newCar;

       }
       // update cars
       async updateCar(carId: string, updateData: UpdateCarDto ) {
        const cars = await this.getAllCars();

        const carsExist = cars.some(cars => cars.id === carId);

        if(!carsExist) throw new NotFoundException("Car not found");

        const updatedCars = cars.map(car => {
            if(car.id === carId) {
                return { ...car, ...updateData};
            } else {
                return car
            }
        });

        await this.saveCars(updatedCars);
       }
       //delete cars
       async deleteCar(carId: string) {
        const cars = await this.getAllCars();

        const updatedCars = cars.filter(car => car.id === carId);

        if(cars.length === updatedCars.length) throw new NotFoundException("Cars not found");

        await this.saveCars(updatedCars);
       }


}
 
