// import class-validator
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { randomUUID, UUID } from 'crypto';
import { UserRole } from '../enum/role_enumeration';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['admin', 'user', 'guest'], {
    message: "role must be either 'admin', 'user', or 'guest'",
  })
  role: UserRole;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.role = UserRole.Guest;
  }
}
