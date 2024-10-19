import { Injectable } from '@nestjs/common';
import { CronExpression, Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/service/prisma.service';
import { addYears, differenceInMonths, subYears } from 'date-fns';

@Injectable()
export class CronService {
  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_DAY_AT_3AM, { name: 'daysOfLawUpdater' })
  async updateDaysOfLaw() {
    const vacations = await this.prisma.vestingPeriod.findMany({
      where: { startDate: { gt: subYears(new Date(), 1), lt: new Date() } },
    });

    vacations.forEach(async (vacation) => {
      if (differenceInMonths(new Date(), vacation.startDate) <= 12) {
        await this.prisma.vestingPeriod.update({
          where: { id: vacation.id },
          data: {
            daysOfLaw: differenceInMonths(new Date(), vacation.startDate) * 2.5,
          },
        });
      }
    }),
      console.log('Updated days of law');
  }

  @Cron(CronExpression.EVERY_DAY_AT_4AM, { name: 'updateVacations' })
  async updatePeriodsOfVacations() {
    const vacations = await this.prisma.vestingPeriod.findMany({
      where: { endDate: null },
    });

    vacations.forEach(async (vacation) => {
      if (differenceInMonths(new Date(), vacation.startDate) >= 12) {
        await this.prisma.vestingPeriod.update({
          where: { id: vacation.id },
          data: { endDate: addYears(vacation.startDate, 1) },
        });
        await this.prisma.vestingPeriod.create({
          data: {
            startDate: addYears(vacation.startDate, 1),
            employeeId: vacation.employeeId,
            daysOfLaw: 0,
          },
        });
      }
    });
  }
}
