import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  async getHello(): Promise<string> {
    return this.appService.getHello();
  }

  @Get('init')
  async initializePayment(): Promise<string> {
    return this.appService.initializePayment();
  }
}
