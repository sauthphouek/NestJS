import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from '../enum/role_enumeration';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../dto/create-user.dto';

@Entity('users')
export class User extends PartialType(CreateUserDto) {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  //   @Column({ nullable: true }) // Allow null values for optional email verification
  //   emailVerified: boolean;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.Guest })
  role: UserRole;

  @Column({ nullable: true }) // Allow null values for optional guest users
  password?: string; // Optional password for registered users

  //   @Column({ nullable: true }) // Allow null values for guest users
  //   refreshToken?: string; // Optional refresh token for registered users
}
