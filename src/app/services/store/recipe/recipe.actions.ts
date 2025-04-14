import { createAction, props } from '@ngrx/store';
import { Recipe } from 'src/app/interfaces/recipe_functions.interface';


//Load
export const loadRecipes = createAction('[Recipes] Load Recipes');
export const loadRecipesSuccess = createAction(
  '[Recipes] Load Recipes Success',
  props<{ recipes: Recipe[] }>()
);
export const loadRecipesFailure = createAction(
  '[Recipes] Load Recipes Failure',
  props<{ error: any }>()
);

//Add
export const addRecipe = createAction(
  '[Recipes] Add Recipe',
  props<{ recipe: Recipe }>()
);
export const addRecipeSuccess = createAction(
  '[Recipes] Add Recipe Success',
  props<{ recipe: Recipe }>()
);
export const addRecipeFailure = createAction(
  '[Recipes] Add Recipe Failure',
  props<{ error: any }>()
);

//Update
export const updateRecipe = createAction(
  '[Recipes] Update Recipe',
  props<{ id: string; changes: Partial<Recipe> }>()
);
export const updateRecipeSuccess = createAction(
  '[Recipes] Update Recipe Success',
  props<{ id: string; changes: Partial<Recipe> }>()
);
export const updateRecipeFailure = createAction(
  '[Recipes] Update Recipe Failure',
  props<{ error: any }>()
);

//Delete
export const deleteRecipe = createAction(
  '[Recipes] Delete Recipe',
  props<{ id: string }>()
);
export const deleteRecipeSuccess = createAction(
  '[Recipes] Delete Recipe Success',
  props<{ id: string }>()
);
export const deleteRecipeFailure = createAction(
  '[Recipes] Delete Recipe Failure',
  props<{ error: any }>()
);
