import { Controller } from '@nestjs/common';

@Controller('week')
export class WeekController {
  @Get()
  async getWeeks(): Promise<WeekDay[][]> {
    return this.weekService.getWeeks();
  }
}
