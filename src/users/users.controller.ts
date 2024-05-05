import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseIntPipe,
  ValidationPipe,
  UseInterceptors,
  UseFilters,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { HttpExceptionFilter } from 'src/common/filters/http-exception.filter';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';

@Controller('users')
@UseInterceptors(TransformInterceptor)
@UseFilters(HttpExceptionFilter)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(
    @Query('role') role?: string,
    @Query('id') id?: number,
  ): Promise<User | User[]> {
    return this.usersService.findAll(role, +id);
  }

  @Post()
  createNewUser(@Body(ValidationPipe) user: CreateUserDto) {
    return this.usersService.createNewUser(user);
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getUserById(id);
  }

  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body(ValidationPipe) user: UpdateUserDto,
  ) {
    return this.usersService.updateUser(+id, user);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
