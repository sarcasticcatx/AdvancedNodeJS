import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCarsInsuranceDto } from './dto/create-cars-insurance.dto';
import { UpdateCarsInsuranceDto } from './dto/update-cars-insurance.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Insurance } from './entities/cars-insurance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CarInsuranceService {
  constructor(@InjectRepository(Insurance) private carInsuranceRepo: Repository<Insurance>,) {}
  


  getAllCarInsurances() {
    return this.carInsuranceRepo.find({});
  }

  async findOne(id: string) {
    try {
      const foundCarInsurance = await this.carInsuranceRepo.findOneOrFail({
        where: { id},
        relations: {
          cars: true
        }
      });

      return foundCarInsurance;
    } catch (error) {
      throw new BadRequestException("insurance not found")
    };
  }

  createInsurance(insuranceData: CreateCarsInsuranceDto ) {
    // const newInsurance = this.carInsuranceRepo.create({
    //   policyNumber: insuranceData.policyNumber,
    //   provider: insuranceData.provider,
    //   coverageDetails: insuranceData.coverageDetails,
    //   cars: insuranceData.cars,
    // })
    // return this.carInsuranceRepo.save(newInsurance)
  } //this too
}
  




