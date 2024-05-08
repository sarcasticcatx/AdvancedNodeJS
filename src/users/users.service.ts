import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create_user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entitities/users.entitie';


@Injectable()
export class UsersService {
constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  findAllUsers() {
    return this.userRepo.find({});
  }
async findUserWithCar(id: string) {
  try {
    const findUser = await this.userRepo.findOne( {where: {id},
    relations: { cars: true} }
    )
  
    return findUser;
  } catch (error) {
    throw new NotFoundException("user not found")
  }
}
 async getUserById(id: string) {
    try {
      const foundUser = await this.userRepo.findOneByOrFail({id});

      return foundUser;
    } catch (error) {
      throw new BadRequestException("user not found hehe");
    };
  }
  
// a new one finding user by email
getUserByEmail(email: string) {
  return this.userRepo.findOneBy({email})
}

  async createUser(creaUserDto: CreateUserDto) {
    try {
      const userData = creaUserDto;

      const newUser = await this.userRepo.save(userData);

      return newUser;
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async updateUser(id: string, updateData: UpdateUserDto) {
    const foundUser = await this.getUserById(id);

    Object.assign(foundUser, updateData);

await this.userRepo.save(foundUser)
  }

//?addin tokens here in between updateuser and deleteuser

async saveToken(userId: string, refreshToken: string) {
  const foundUser = await this.getUserById(userId);

  foundUser.refreshToken.push(refreshToken);

  await this.userRepo.save(foundUser);
};

async deleteToken(userId: string, refreshToken: string) {
  const foundUser = await this.getUserById(userId);

  foundUser.refreshToken = foundUser.refreshToken.filter((token) => token !== refreshToken,)

  await this.userRepo.save(foundUser);
}
//?
  async removeUser(id: string) {
    const foundUser = await this.getUserById(id);

    await this.userRepo.remove(foundUser)
  }
}
