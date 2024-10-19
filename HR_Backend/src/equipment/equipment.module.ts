import { Module } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';
import { PrismaService } from 'src/service/prisma.service';

@Module({
  imports: [],
  providers: [EquipmentService, PrismaService],
  controllers: [EquipmentController],
})
export class EquipmentModule {}
