import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRole } from './enum/role_enumeration';

@Injectable()
export class UsersService {
  // list of users
  private users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@gamil.com',
      role: UserRole.Admin,
    },
    // Neymar
    {
      id: 2,
      name: 'Neymar Jr',
      email: 'neymar.js@gmail.com',
      role: UserRole.User,
    },
    // Messi
    {
      id: 3,
      name: 'Lionel Messi',
      email: 'lionel.messi10@gmail.com',
      role: UserRole.ContentCreator,
    },
  ];

  // find all users
  findAll(role?: string, id?: number) {
    if (role) {
      const user = this.users.filter(user => user.role === role);
      if (user.length) {
        return user;
      }
      throw new NotFoundException(`User with role ${role} not found`);
    }

    if (id) {
      return this.getUserById(id);
    }

    return this.users;
  }

  getUserById(id: number) {
    const user = this.users.find(user => user.id === id);
    if (user) {
      return user;
    }
    throw new NotFoundException(`User with id ${id} not found`);
  }

  // create a new user
  createNewUser(user: CreateUserDto) {
    const userByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: userByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  // update a user
  updateUser(id: number, user: UpdateUserDto) {
    const userId = this.getUserById(id);
    if (userId) {
      const index = this.users.indexOf(userId);
      this.users[index] = { ...userId, ...user };
      return this.users[index];
    }

    throw new NotFoundException(`User with id ${id} not found`);
  }

  // delete a user
  deleteUser(id: number) {
    const userId = this.getUserById(id);
    if (userId) {
      this.users = this.users.filter(user => user.id !== id);
      return userId;
    }
    throw new NotFoundException(`User with id ${id} not found`);
  }
}
