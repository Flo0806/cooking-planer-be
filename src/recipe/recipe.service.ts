import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeBody } from 'src/common/interfaces/body.interface';
import { Recipe } from 'src/entities/recipe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe) private recipeRepo: Repository<Recipe>,
  ) {}

  async createRecipe(recipe: RecipeBody, file?: Express.Multer.File) {
    const newRecipe = this.recipeRepo.create(recipe);
    if (file) {
      newRecipe.image = file.filename;
    }
    return await this.recipeRepo.save(newRecipe, { reload: true });
  }
}
