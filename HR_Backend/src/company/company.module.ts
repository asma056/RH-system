import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { PrismaService } from 'src/service/prisma.service';
import { CompanyController } from './company.controller';
@Module({
  imports: [],
  controllers: [CompanyController],
  providers: [CompanyService, PrismaService],
})
export class CompanyModule {}
