import { Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  getHello: any;
  constructor(private readonly appService: AppService) {}
}
