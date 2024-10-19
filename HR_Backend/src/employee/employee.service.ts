import { Injectable } from '@nestjs/common';
import {
  addYears,
  differenceInCalendarYears,
  differenceInMonths,
} from 'date-fns';
import { PrismaService } from 'src/service/prisma.service';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { UpdateEmployeeDto } from './dto/updateEmployee.dto';
import { UpdateStatutsDto } from './dto/updateStatuts';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService, private s3Service: S3Service) {}

  async getAllEmployees() {
    const employees = await this.prisma.employee.findMany();
    return employees;
  }

  async get(id: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { id },
      include: { address: true },
    });

    return employee;
  }

  async create(body: CreateEmployeeDto, file: Express.Multer.File) {
    console.log("body : ",body);

    if (!file) {
      throw new Error('File is missing in the request');
    }

    const { fieldname, originalname, mimetype } = file;
    const imgUrl = await this.s3Service.uploadFile(
        file,
      `${fieldname}/${originalname}`,
    );
    const { address, ...employeeData } = body;
    const { admissionDate,fullName,corporateEmail, dateOfBirth, emissionDate } = employeeData;
    const parsedAdmissionDate = new Date(admissionDate);
    const hashedPassword = await bcrypt.hash("3035tech", 10);

    const userCreateData: Prisma.UserCreateInput = {
      email: corporateEmail, // Utilisez le courriel de l'employé pour créer l'utilisateur
      name: fullName, // Utilisez le nom complet de l'employé pour le nom de l'utilisateur
      password: hashedPassword, // Vous devez définir un mot de passe initial
      role: 'EMPLOYEE',
      refreshToken: body.refresh_token, // Définissez le rôle de l'utilisateur comme 'EMPLOYEE'
      actived: true, // Assurez-vous que l'utilisateur est actif
    };

    // Créez d'abord l'utilisateur
    const createdUser = await this.prisma.user.create({
      data: userCreateData,
    });

const employee = await this.prisma.employee.create({
  data: {
    ...employeeData,
    admissionDate: new Date(admissionDate),
    dateOfBirth: new Date(dateOfBirth),
    emissionDate: new Date(emissionDate),
    address: { create: address },
    active : true , 
    imgUrl: imgUrl,
    userId: createdUser.id, // Associez l'employé à l'utilisateur créé 
    vestingPeriods: {
      create: Array.from({
        length: differenceInCalendarYears(new Date(), parsedAdmissionDate) + 1,
      }).map((_, index) => {
        const startDate = addYears(parsedAdmissionDate, index);
        const endDate = addYears(parsedAdmissionDate, index + 1);

        const daysOfLaw = differenceInMonths(endDate || new Date(), startDate) * 2.5;
        console.log(startDate, endDate, daysOfLaw);
        return {
          startDate,
          daysOfLaw,
          endDate,
        };
      }),
    },
  },
});

const returnEmployee = await this.prisma.employee.findUnique({
  where: {
    id: employee.id,
  },
  include: {
    address: true,    
  },
});

return returnEmployee;
  }
  async update(body: UpdateEmployeeDto, emp_id: number,file: Express.Multer.File) {

    const {
      admissionDate,
      ...employeeData
    } = body;

    if (file) {
      

    const { fieldname, originalname, mimetype } = file;
    const imgUrl = await this.s3Service.uploadFile(
        file,
      `${fieldname}/${originalname}`,
    );

    const employee = await this.prisma.employee.update({
      where: { id: emp_id },
      data: {
        ...employeeData,
        admissionDate: new Date(admissionDate),
        imgUrl: imgUrl,

      },
    });
    return employee
    }

  

    const employee = await this.prisma.employee.update({
      where: { id: emp_id },
      data: {
        ...employeeData,
        admissionDate: new Date(admissionDate),

      },
    });

    return employee;
  }


  async updateStatuts(body : UpdateStatutsDto, emp_id: number) {
    
    const {active} = body
    const employee = await this.prisma.employee.update({
      where: { id: emp_id },
      data: {
        active: active
      },
    });

    return employee;
  }


  async delete(id: number) {
    const employee = await this.prisma.employee.delete({
      where: { id },
    });

    return employee;
  }
}
