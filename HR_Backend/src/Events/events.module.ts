import { Module } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { EventController } from './events.controller';
import { EventService } from './events.service';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [S3Module],
  providers: [EventService, PrismaService],
  controllers: [EventController],
})
export class EventsModule {}
