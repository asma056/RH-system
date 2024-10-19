import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '@prisma/client';

import { VacationService } from './vacation.service';
import { CreatePeriodVacation } from './dto/createVacationPeriod.dto';
import { UpdatePeriodVacation } from './dto/updateVacationPeriod.dto';

import { Role } from 'src/common/decorators/roles.decorators';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { UpdateVacationStatus } from './dto/updateVacationStatus';

@ApiTags('vacation')
// @UseGuards(AccessTokenGuard, RolesGuard) 
@Controller('employee/vacation')
export class VacationController {
  constructor(private vacationService: VacationService) {}

  @Role(Roles.ADMIN, Roles.SUPER_ADMIN)
  @Get('/listAllActiveVacations')
  async getVacationInformation() {
    const allVacations = await this.vacationService.findAllActiveVacations();
    return {
      message: 'Successfully retrieved vacation information',
      results: allVacations,
    };
  }


  @Role(Roles.ADMIN, Roles.SUPER_ADMIN)
  @Get('/:id')
  async getVacation(@Param('id') id: string) {
    const vacation = await this.vacationService.getVacationById(+id);
    return {
      message: 'Successfully retrieved vacation information',
      results: vacation,
    };
  }

  @Role(Roles.ADMIN, Roles.SUPER_ADMIN)
  @Get('/listAllVacations/:employeeId')
  async getAllVacationsForEmployee(@Param('employeeId') employeeId: string) {
    const allVacations = await this.vacationService.findAllVacationsForEmployee(+employeeId);
    if (!allVacations) {
      return new HttpException('vacations not found', HttpStatus.NOT_FOUND);
    }

    return {
      message: 'Successfully retrieved all vacations for employee',
      results: allVacations,
    };
  }


  @Role(Roles.ADMIN, Roles.SUPER_ADMIN)
  @Get('/listVacationsActive/:employeeId')
  async getAllVacationsActiveForEmployee(@Param('employeeId') employeeId: string) {
    const allVacations = await this.vacationService.findAllVacationsActiveForEmployee(+employeeId);
    return {
      message: 'Successfully retrieved all vacations active for employee',
      results: allVacations,
    };
  }

  @Role(Roles.ADMIN, Roles.SUPER_ADMIN)
  @Patch('/create/:employeeId/:vestingPeriodId')
  async createVacationPeriod(
    @Body() body: CreatePeriodVacation,
    @Param('employeeId') employeeId: string,
    @Param('vestingPeriodId') vestingPeriodId: string,
  ) {
    const createdPeriodVacation =
      await this.vacationService.createVacationPeriod(
        body,
        +employeeId,
        +vestingPeriodId,
      );

    if (!createdPeriodVacation.status) {
      throw new HttpException(
        createdPeriodVacation.message,
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      message: 'Successfully created period of vacation',
      results: createdPeriodVacation,
    };
  }

  @Role(Roles.ADMIN, Roles.SUPER_ADMIN)
  @Put('/update/:id')
  async updateVacationPeriod(
    @Body() body: UpdatePeriodVacation,
    @Param('id') id: string,
  ) {
    const updatedPeriodVacation =
      await this.vacationService.updateVacationPeriod(body, +id);

    if (!updatedPeriodVacation.status) {
      throw new HttpException(
        updatedPeriodVacation.message,
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      message: 'Successfully updated period of vacation',
      results: updatedPeriodVacation,
    };
  }

  @Role(Roles.SUPER_ADMIN)
  @Put('/update-vacation-status/:id')
  async updateVacationStatus(
    @Body() body: UpdateVacationStatus,
    @Param('id') id: string,
  ) {
    const updatedVacationStatus =
      await this.vacationService.updateVacationStatus(body, +id);

    return {
      message: 'Successfully updated period of vacation',
      results: updatedVacationStatus,
    };
  }

  @Role(Roles.ADMIN, Roles.SUPER_ADMIN)
  @Delete('/delete/:id')
  async deleteVacationPeriod(@Param('id') id: string) {
    const deleteVacation = await this.vacationService.deleteVacationPeriod(+id);

    if (!deleteVacation.status) {
      throw new HttpException(deleteVacation.message, HttpStatus.BAD_REQUEST);
    }

    return {
      message: deleteVacation.message,
    };
  }
}
