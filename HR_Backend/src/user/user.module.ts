import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PrismaService } from 'src/service/prisma.service';
import { MailModule } from 'src/service/email/mailer.module';
import { MailService } from 'src/service/email/mail.service';

@Module({
  imports: [MailModule],
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
