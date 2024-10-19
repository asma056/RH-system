import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { subYears, differenceInDays,format } from 'date-fns';
import { CreatePeriodVacation } from './dto/createVacationPeriod.dto';
import { UpdatePeriodVacation } from './dto/updateVacationPeriod.dto';
import { UpdateVacationStatus } from './dto/updateVacationStatus';

@Injectable()
export class VacationService {
  constructor(private prisma: PrismaService) {}

  async getVacationById (id: number) {
    const vacation = await this.prisma.vacationPeriod.findUnique({
      where:{id: id}
    })

    if (!vacation) {
      throw new NotFoundException(`vacation with id ${id} not found`);
    }

    return vacation

  }

  async findAllVacationsForEmployee(employeeId: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
      select: {
        vestingPeriods: {
          include: {
            VacationPeriod: true
          }
        }
      }
    
    });

    if (!employee) {
      throw new NotFoundException(`Employee with id ${employeeId} not found`);
    }

    const allVacations = employee.vestingPeriods.reduce((acc, period) => {
      if(period.VacationPeriod.length == 0 ){
        return null ;
      }
      period.VacationPeriod.forEach(vacation => {
        const dateNow = format(new Date() ,'yyyy-MM-dd' );
        const dateEnd = format(new Date(vacation.endDate),"yyyy-MM-dd");

        acc.push({
          id: vacation.id,
          vestingStartDate: period.startDate,
          vestingEndDate: period.endDate,
          balanceDays: period.daysOfLaw,
          startDate: vacation.startDate,
          endDate: vacation.endDate,
          status: vacation.status,
          daysOf: vacation.daysOf,
          actived: dateEnd > dateNow
        });
      });
      return acc.reverse();
    }, []);

    return allVacations;
  }

  async findAllVacationsActiveForEmployee(employeeId: number) {
    const employee = await this.prisma.employee.findUnique({
      where: { id: employeeId },
      select: {
        vacations: {
          where: {
            endDate: {
              gt: new Date() // Filtrer les congés dont la date de fin est ultérieure à la date actuelle
            }
          }
        }
      }
          });

    if (!employee) {
      return null ;
    }

    return employee.vacations ;

  }












  async findAllActiveVacations() {
    const employees = await this.prisma.employee.findMany({
      select: {
        id: true,
        fullName: true,
        jobFormat: true,
        vacations: {
          where: {
            endDate: {
              gt: new Date() // Filtrer les congés dont la date de fin est ultérieure à la date actuelle
            }
          }
        }
      }
    });
  
    // Filtrer les employés qui ont des vacances actives
    const employeesWithActiveVacations = employees.filter(employee => employee.vacations.length > 0);
  
    // Récupérer uniquement les informations nécessaires pour chaque employé avec des vacances actives
    
    return employeesWithActiveVacations;
  }
  

  async createVacationPeriod(
    body: CreatePeriodVacation,
    employeeId: number,
    vestingPeriodId: number,
  ) {
    const { startDate, endDate, status } = body;
    const finalDate = new Date(endDate);
    const initialDate = new Date(startDate);
    const difference = differenceInDays(finalDate, initialDate);

    const vacation = await this.prisma.vestingPeriod.findFirst({
      where: { id: vestingPeriodId, employeeId },
    });



    if (
      initialDate.valueOf() < vacation.startDate.valueOf() ||
      finalDate.valueOf() > (vacation.endDate.valueOf() || new Date().valueOf())
    ) {
      return { status: false, message: 'Invalid dates params' };
    }

    if (difference < 5) {
      return { status: false, message: 'Invalid dates params' };
    }

    if (difference > vacation.daysOfLaw.toNumber()) {
      return { status: 500, message: 'Invalid dates params' };
    }

    await this.prisma.vestingPeriod.update({
      where: { id: vestingPeriodId },
      data: {
        VacationPeriod: {
          create: {
            startDate: initialDate,
            endDate: finalDate,
            status,
            daysOf: difference,
            employeeId,
          },
        },
        daysOfLaw: {
          decrement: difference,
        },
      },
    });

    const createdVacation = await this.prisma.vacationPeriod.findFirst({
      where: { vacationId: vestingPeriodId, employeeId },
      select: {
        id: true,
        vacationId: false,
        startDate: true,
        endDate: true,
        daysOf: true,
        status: true,
        employeeId: true,
      },
    });
    return {
      status: true,
      createdVacation,
    };
  }

  async updateVacationPeriod(body: UpdatePeriodVacation, id: number) {
    const { startDate, endDate, status } = body;

    const initialDate = new Date(startDate);
    const finalDate = new Date(endDate);
    const difference = differenceInDays(finalDate, initialDate);

    if (difference < 5 || difference > 30) {
      return { status: false, message: 'Invalid dates params' };
    }

    const updateVacationPeriod = await this.prisma.vacationPeriod.update({
      where: { id },
      data: {
        status,
        daysOf: difference,
        startDate: initialDate,
        endDate: finalDate,
      },
    });

    return { status: true, updateVacationPeriod };
  }

  async updateVacationStatus(body: UpdateVacationStatus, id: number) {
    const { status } = body;

    const vacationPeriod = await this.prisma.vacationPeriod.findUnique({
      where: { id },
    });

    if (!vacationPeriod) {
      throw new HttpException(
        `Período de férias com id ${id} não encontrado`,
        HttpStatus.NOT_FOUND,
      );
    }

    const updatedVacationStatus = await this.prisma.vacationPeriod.update({
      where: { id },
      data: {
        status,
      },
    });

    return { status: true, updatedVacationStatus };
  }

  async deleteVacationPeriod(id: number) {
    const deletedVacation = await this.prisma.vacationPeriod.findUnique({
      where: { id },
    });

    if (!deletedVacation) {
      return {
        status: false,
        message: 'Vacation period not found',
      };
    }

    await this.prisma.vacationPeriod.delete({
      where: { id },
    });

    return {
      status: true,
      message: `Vacation period with id ${id} successfully deleted.`,
    };
  }
}
