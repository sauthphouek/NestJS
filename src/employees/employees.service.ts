import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly database: DatabaseService) {}
  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return await this.database.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: 'Admin' | 'User' | 'Supervisor') {
    if (role) {
      return await this.database.employee.findMany({
        where: {
          role,
        },
      });
    }
    return await this.database.employee.findMany();
  }

  async findOne(id: number) {
    const employee = await this.database.employee.findUnique({
      where: {
        id,
      },
    });
    if (employee) {
      return employee;
    }
    return new NotFoundException(`Employee with id ${id} not found`);
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    const employee = this.findOne(id);
    if (employee) {
      return await this.database.employee.update({
        where: {
          id,
        },
        data: updateEmployeeDto,
      });
    }

    return new NotFoundException(`Employee with id ${id} not found`);
  }

  async remove(id: number) {
    const deletedEmployee = this.findOne(id);
    if (deletedEmployee) {
      return await this.database.employee.delete({
        where: {
          id,
        },
      });
    }
    return new NotFoundException(`Employee with id ${id} not found`);
  }
}
