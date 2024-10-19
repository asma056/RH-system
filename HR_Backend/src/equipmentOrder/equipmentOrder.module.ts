import { Module } from '@nestjs/common';
import { EquipmentOrderService } from './equipmentOrder.service';
import { PrismaService } from 'src/service/prisma.service';
import { EquipmentOrderController } from './equipmentOrder.controller';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [S3Module],
  providers: [EquipmentOrderService, PrismaService],
  controllers: [EquipmentOrderController],
})
export class EquipmentOrderModule {}
