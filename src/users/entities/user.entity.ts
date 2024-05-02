import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserRole } from '../enum/role_enumeration';

@Entity('users')
export class User {
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
