import { Module } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { AlertsController } from './alerts.controller';
import { AlertsService } from './alerts.service';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [S3Module],
  providers: [AlertsService, PrismaService],
  controllers: [AlertsController],
})
export class AlertsModule {}
