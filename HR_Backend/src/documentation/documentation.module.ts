import { Module } from '@nestjs/common';
import { S3Module } from 'src/s3/s3.module';
import { PrismaService } from 'src/service/prisma.service';
import { DocumentService } from './documemtation.service';
import { DocumentController } from './documetation.controller';

@Module({
  imports: [S3Module],
  providers: [DocumentService, PrismaService],
  controllers: [DocumentController],
})
export class DocumentModule {}
