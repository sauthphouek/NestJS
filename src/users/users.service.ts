import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  create(createUserDto: CreateUserDto) {
    return {
      "success": true,
      "message": "User created successfully!",
      "data": {
          "id": randomUUID(),
          "name": createUserDto.name,
          "email": createUserDto.email , 
          "password": createUserDto.password, 
      }
    };
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: string) {
    return {
      "success": true,
      "message": "User found",
      "data": {
          "id": "b0d7f7f3-9a6e-4b3c-9c0b-7a2e4a3f4b2d",
          "name": "John Doe",
          "email": "jonh.doe@gmail.com",
      }
    };
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
