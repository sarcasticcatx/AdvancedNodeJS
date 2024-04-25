import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCarDto } from "./dtos/create.car.dto";
import { UpdateCarDto } from "./dtos/update.car.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Cars } from "./entities/cars.entities";
import { FindManyOptions, Repository } from "typeorm";
import { CarsFilters } from "./interface/cars.filters.interface";


//? Second stage
@Injectable()
export class CarsService {
  constructor(@InjectRepository(Cars) private carsRepo: Repository<Cars>,) {}

  //get all cars
  getAllCars(filters: CarsFilters) {
    const filterConfig: FindManyOptions<Cars> ={};

    console.log(filters);

    if(filters.searchByMake) {
        filterConfig.where = { make: filters.searchByMake}
    }
    if(filters.searchByModel) {
        filterConfig.where = { model: filters.searchByModel}
    }
    if(filters.searchByYear) {
        filterConfig.where = { year: filters.searchByYear}
    }

    console.log(filterConfig);

    return this.carsRepo.find(filterConfig)
  }
  //get car by id
  async getCarById(id: number) {
    const foundCars = await this.carsRepo.findOneBy({id});
    

    if(!foundCars) throw new NotFoundException("Car Not Found");

    return foundCars;

  }
  //create car
    createCar(carData: CreateCarDto) {
    return this.carsRepo.save(carData)
  }
  //update car
  async updateCar(carId: number, updateData: UpdateCarDto) {
    const foundCar = await this.getCarById(carId);

    Object.assign(foundCar, updateData);

    await this.carsRepo.save(foundCar)
  }
  //delete car
  async deleteCar(carId: number) {
    const foundCar = await this.getCarById(carId);

    await this.carsRepo.remove(foundCar);
  }
    }


 
