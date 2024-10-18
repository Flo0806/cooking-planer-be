import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { WeekService } from './week.service';
import { WeekRecipeBody } from 'src/common/interfaces/body.interface';

@Controller('week')
export class WeekController {
  constructor(private readonly weekService: WeekService) {}

  @Get('weeks')
  async getWeeks() {
    return this.weekService.getWeeks();
  }

  @Patch(':date/recipe')
  async addRecipeToWeekDay(
    @Param('date') date: Date,
    @Body() body: WeekRecipeBody,
  ) {
    return this.weekService.addRecipeToWeekDay(new Date(date), body);
  }

  @Delete(':date/recipe/:recipeId')
  async removeRecipeFromWeekDay(
    @Param('date') date: Date,
    @Param('recipeId') recipeId: string,
  ) {
    return await this.weekService.removeRecipeFromWeekDay(
      new Date(date),
      recipeId,
    );
  }
}
