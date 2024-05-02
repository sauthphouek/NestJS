import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { randomUUID } from 'crypto';
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
    if (role || id) {
      return this.users.filter(user => user.id === id && user.role === role);
    }
    return this.users;
  }

  getUserById(id: number) {
    return this.users.find(user => user.id === id);
  }

  // create a new user
  createNewUser(user: User) {
    const newUser = {
      id: this.users.length + 1,
      ...user,
    };
    return this.users.push(newUser);
  }

  // update a user
  updateUser(id: number, user: User) {
    const userId = this.getUserById(id);
    if (userId) {
      const index = this.users.indexOf(userId);
      this.users[index] = { ...userId, ...user };
      return this.users[index];
    }

    return null;
  }

  // delete a user
  deleteUser(id: number) {
    const userId = this.getUserById(id);
    if (userId) {
      this.users = this.users.filter(user => user.id !== id);
      return userId;
    }

    return null;
  }
}
