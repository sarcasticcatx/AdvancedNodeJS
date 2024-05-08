import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create_user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Get()
  findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @Get(':id')
  getUserById(@Param('id') userId: string) {
    return this.usersService.getUserById(userId);
  }

  @Get(':id/details')
  findUserWithCar(@Param('id') userId: string) {
    return this.usersService.findUserWithCar(userId);
  }

  @Post()
  createUser(@Body() userData: CreateUserDto) {
    return this.usersService.createUser(userData);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateUser(@Param('id') userId: string, @Body() updateData: UpdateUserDto) {
    return this.usersService.updateUser(userId, updateData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.I_AM_A_TEAPOT)
  removeUser(@Param('id') userId: string) {
    return this.usersService.removeUser(userId);
  }
}
