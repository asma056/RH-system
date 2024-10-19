import { Module } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';

@Module({
  imports: [],
  providers: [PrismaService],
})
export class CronModule {}
