import { Module } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { CronService } from 'src/cron/cron.service';
import { S3Module } from 'src/s3/s3.module';
import { S3Service } from 'src/s3/s3.service';

@Module({
  imports: [S3Module],
  providers: [EmployeeService, PrismaService, CronService],
  controllers: [EmployeeController],
}) 
export class EmployeeModule {}
