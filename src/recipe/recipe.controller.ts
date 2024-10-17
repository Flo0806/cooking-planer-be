import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { RecipeService } from './recipe.service';
import { RecipeBody } from 'src/common/interfaces/body.interface';

@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get('recipes')
  async getAllRecipes() {
    return await this.recipeService.getAllRecipes();
  }

  @Get(':id')
  async getRecipeById(@Param('id') recipeId: string) {
    return await this.recipeService.getRecipeById(recipeId);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createRecipe(
    @UploadedFile() image: Express.Multer.File, // Das hochgeladene Bild
    @Body() body: RecipeBody, // Restliche Rezeptdaten
  ) {
    return this.recipeService.createRecipe(body, image); // Ohne Bild
  }
}
