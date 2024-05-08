import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { Insurance } from 'src/cars-insurance/entities/cars-insurance.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car) private carsRepo: Repository<Car>,
  ) {}

  //get all
  getAllCars() {
    return this.carsRepo.find({loadRelationIds: true})
  }

  //get car by id
  async getCarById(id: string) {
    try {
      const foundCar = await this.carsRepo.findOne({
        where: { id},
        relations: {
          manufacturer: true,
          insurance: true,
        }
      });

      return foundCar;
    } catch (error) {
      throw new NotFoundException("Car not found");
    }

  }
  //create car
 createCar(carData: CreateCarDto) {

    // const newCar = this.carsRepo.create({ // it doesnt work so it needs to be commented
    //   make: carData.make,
    //   model: carData.model,
    //   year: carData.year,
    //   manufacturer: carData.manufacturer,
    //   insurance: carData.insurance,
    // })
    // return this.carsRepo.save(newCar)

  }

  //update car
  async updateCar(id: string, updateData: UpdateCarDto) {
    const foundCar = await this.getCarById(id);

    Object.assign(foundCar, updateData);

    console.log(updateData)

    console.log(foundCar);

    await this.carsRepo.save(foundCar);
  }
  //delete car
  async deleteCar(id: string) {
    const foundCar = await this.getCarById(id);

    await this.carsRepo.remove(foundCar);
  }

  


}