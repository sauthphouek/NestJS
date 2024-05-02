// import class-validator
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { randomUUID, UUID } from 'crypto';

export interface CreateUserInterface {
  /// using uuid as id
  id: number;
  name: string;
  email: string;
  role: string;
}

export class CreateUserDto implements CreateUserInterface {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  role: string;

  constructor(id: number, name: string, email: string, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = password;
  }
}
