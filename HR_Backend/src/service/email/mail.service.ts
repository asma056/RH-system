import { MailerService, ISendMailOptions } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GeneratePasswordDto } from './dto/generatePasswordDto';

@Injectable()
export class MailService {
  constructor(
    private mailService: MailerService,
    private config: ConfigService,
  ) {}

  private async sendEmailGeneric(payload: ISendMailOptions) {
    const { to, template, subject, context } = payload;

    const transport = await this.mailService.sendMail({
      to,
      from: this.config.get('MAIL_TRAP_FROM'),
      subject,
      template,
      context,
    });

    return transport;
  }
  async sendEmailNewPassword(body: GeneratePasswordDto) {
    const { name, email } = body;
    const sender = await this.sendEmailGeneric({
      to: email,
      subject: 'Welcome to Nice App! Confirm your password',
      template: 'generatePassword',
      context: { name },
    });

    if (sender.messageTime < 0) {
      return { status: 400, message: 'Failed to send email' };
    }
    return { status: 200, message: 'Email sent successfully' };
  }

  // async updatePassword(email: string, password: string) {}
}
