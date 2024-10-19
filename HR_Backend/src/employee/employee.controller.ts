import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { Roles } from '@prisma/client';
import { Role } from '../common/decorators/roles.decorators';
import { CreateEmployeeDto } from './dto/createEmployee.dto';
import { UpdateEmployeeDto } from './dto/updateEmployee.dto';
import { EmployeeService } from './employee.service';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UpdateStatutsDto } from './dto/updateStatuts';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('employee')
@Controller('employee')
//@UseGuards(AccessTokenGuard, RolesGuard)
export class EmployeeController {
  constructor(private employeeService: EmployeeService) {}

  @Get('/all')
  async GetEmployeeList() {
    const allEmployees = await this.employeeService.getAllEmployees();

    if (!allEmployees) {
      return new HttpException('Employees not found', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Successfully retrieved all employees',
      results: allEmployees,
    };
  }
  @Get('/:id')
  async getEmployees(@Param('id') id: string) {
    const employee = await this.employeeService.get(+id);
    if (!employee) {
      return new HttpException('Employee not found', HttpStatus.NOT_FOUND);
    }

    return employee;
  }

 @Role(Roles.SUPER_ADMIN)
 @Role(Roles.ADMIN)
 @UseInterceptors(FileInterceptor('file'))
  @Post('/create')
  async createEmployee(@UploadedFile() file: Express.Multer.File, @Body() body: CreateEmployeeDto) {

    const employee = await this.employeeService.create(body, file);
    return { message: 'Employee created successfully', results: employee };
  }

  @Role(Roles.SUPER_ADMIN)
  @Role(Roles.ADMIN)
  @Patch('/update/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateEmployee(
    @Body() body: UpdateEmployeeDto,
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    const employee = await this.employeeService.update(body, +id, file);
    return { message: 'Successfully updated employee', results: employee };
  }


  @Role(Roles.SUPER_ADMIN)
  @Role(Roles.ADMIN)
  @Patch('/update/active/:id')
  async updateEmployeeStatuts(
    @Body() body: UpdateStatutsDto,
    @Param('id') id: string,
  ) {
    const employee = await this.employeeService.updateStatuts(body, +id);
    return { message: 'Successfully updated active', results: employee };
  }

  @Role(Roles.SUPER_ADMIN)
  @Role(Roles.ADMIN)
  @Delete('/delete/:id')
  async deleteEmployee(@Param('id') id: string) {
    const employee = await this.employeeService.delete(+id);
    return { message: 'Successfully deleted employee', results: employee };
  }
}
