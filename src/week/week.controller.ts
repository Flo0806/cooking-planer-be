import { Controller, Get } from '@nestjs/common';
import { WeekService } from './week.service';

@Controller('week')
export class WeekController {
  constructor(private readonly weekService: WeekService) {}

  @Get('weeks')
  async getWeeks() {
    return this.weekService.getWeeks();
  }
}
