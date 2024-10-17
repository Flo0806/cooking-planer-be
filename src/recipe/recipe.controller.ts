import {
  Body,
  Controller,
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

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createRecipe(
    @UploadedFile() image: Express.Multer.File, // Das hochgeladene Bild
    @Body() body: RecipeBody, // Restliche Rezeptdaten
  ) {
    return this.recipeService.createRecipe(body, image); // Ohne Bild
  }
}
