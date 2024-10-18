export interface RecipeBody {
  id?: string;
  title: string;
  description: string;
  rating: number;
  difficulty: number;
  preparationTime: number;
  category: string;
}

export interface WeekRecipeBody {
  recipeId: string;
}
