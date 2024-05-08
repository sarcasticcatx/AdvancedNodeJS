import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manufacturer } from './entities/manufacturer.entity';
import { Repository } from 'typeorm';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

@Injectable()
export class ManufacturerService {
constructor(@InjectRepository(Manufacturer) 
private manufacRepo: Repository<Manufacturer>) {}

//get all manufactures
getAllManufac() {
  return this.manufacRepo.find({});
}

//get manufacturerer by id
async getManufacById(id: string) {
  try {
    // const foundManuf = await this.manufacRepo.findOneByOrFail({id});

    const foundManuf = await this.manufacRepo.findOne({
      where: {id},
      relations: {
        cars: true
      }
    })

    return foundManuf;
  } catch (error) {
    throw new NotFoundException("Manufactuter not exist")
  }

}

//create manufac
async createManufac(createManufacturerDto: CreateManufacturerDto) {
  try {
    const manufacData = createManufacturerDto;

    const newManufac = await this.manufacRepo.save(manufacData)

    return newManufac;
  } catch (error) {
    throw new BadRequestException(error.message)
  }
}
//update manufacturer
async updateManuf(id: string, updateData: UpdateManufacturerDto) {
  const foundManuf = await this.getManufacById(id);

  Object.assign(foundManuf, updateData);

  console.log(updateData);

  console.log(foundManuf);

  await this.manufacRepo.save(foundManuf)
}

//delete manufacturer
async deleteManuf(id: string) {
  const foundManuf = await this.getManufacById(id);

  await this.manufacRepo.remove(foundManuf)
}

}
