import { Module } from '@nestjs/common';
import { EmployeeService } from 'src/employee/employee.service';
import { PrismaService } from 'src/service/prisma.service';
import { VacationController } from './vacation.controller';
import { VacationService } from './vacation.service';
import { CronService } from 'src/cron/cron.service';
import { EmployeeModule } from 'src/employee/employee.module';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [EmployeeModule, S3Module],
  providers: [VacationService, EmployeeService, PrismaService, CronService],
  controllers: [VacationController],
})
export class VacationModule {}
