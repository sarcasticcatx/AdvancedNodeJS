import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';

@Controller('manufacturer')
export class ManufacturerController {
  constructor(private readonly manufacturerService: ManufacturerService) {}

  @Get()
  getAllManufac() {
    return this.manufacturerService.getAllManufac();
  }

 @Post()
  createManufac(@Body() manufacData: CreateManufacturerDto) {
    return this.manufacturerService.createManufac(manufacData);
  }

  @Get(':id')
  geManufacById(@Param('id') manufacId: string) {
    return this.manufacturerService.getManufacById(manufacId);
  }

  @Patch(':id')
  updateManuf(@Param('id') manufacId: string, @Body() updateData: UpdateManufacturerDto) {
    return this.manufacturerService.updateManuf(manufacId, updateData);
  }

  @Delete(':id')
  deleteManuf(@Param('id') manufacId: string) {
    return this.manufacturerService.deleteManuf(manufacId);
  }
}
