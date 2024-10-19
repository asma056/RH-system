import { Module } from '@nestjs/common';
import { PrismaService } from 'src/service/prisma.service';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';

@Module({
  imports: [],
  providers: [AddressService, PrismaService],
  controllers: [AddressController],
})
export class AddressModule {}
