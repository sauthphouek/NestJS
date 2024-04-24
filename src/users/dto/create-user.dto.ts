// import class-validator
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { randomUUID, UUID } from 'crypto';


export interface CreateUserInterface {
    /// using uuid as id
    id: UUID;
    name: string; 
    email: string; 
    password: string;
}


export class CreateUserDto  implements CreateUserInterface {

    @IsString()
    id: UUID;
    
    @IsString()
    name: string; 

    @IsEmail()
    email: string; 

    @IsString()
    password: string;


    constructor(name: string, email: string, password: string) {
        this.id = randomUUID();
        this.name = name;
        this.email = email;
        this.password = password;
    }

}