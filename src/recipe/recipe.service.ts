import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RecipeBody } from 'src/common/interfaces/body.interface';
import { Recipe } from 'src/entities/recipe.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe) private recipeRepo: Repository<Recipe>,
  ) {}

  /**
   * Gibt alle Rezepte zurück
   */
  async getAllRecipes() {
    return await this.recipeRepo.find();
  }

  /**
   * Gibt ein Rezept zurück
   * @param id
   */
  async getRecipeById(id: string) {
    const recipe = await this.recipeRepo.findOne({ where: { id } });

    if (!recipe) {
      throw new NotFoundException(`Recipe with id '${id}' was not found`);
    }

    return recipe;
  }

  async createRecipe(recipe: RecipeBody, file?: Express.Multer.File) {
    const newRecipe = this.recipeRepo.create(recipe);
    if (file) {
      newRecipe.image = file.filename;
    }
    return await this.recipeRepo.save(newRecipe, { reload: true });
  }
}
