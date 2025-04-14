import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import * as RecipeActions from './recipe.actions';
import { Recipe } from 'src/app/interfaces/recipe_functions.interface';

export interface RecipeState extends EntityState<Recipe> {
  loading: boolean;     
  adding: boolean;       
  updating: boolean;     
  deleting: boolean;     
  error: string | null;
}

export const recipeAdapter = createEntityAdapter<Recipe>({
  selectId: (recipe) => recipe.id as string,
});

export const initialState: RecipeState = recipeAdapter.getInitialState({
  loading: false,
  adding: false,
  updating: false,
  deleting: false,
  error: null,
});

export const recipeReducer = createReducer(
  initialState,

  //Load
  on(RecipeActions.loadRecipes, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(RecipeActions.loadRecipesSuccess, (state, { recipes }) =>
    recipeAdapter.setAll(recipes, { ...state, loading: false })
  ),
  on(RecipeActions.loadRecipesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),

  //Add
  on(RecipeActions.addRecipe, (state) => ({
    ...state,
    adding: true,
    error: null,
  })),
  on(RecipeActions.addRecipeSuccess, (state, { recipe }) => {
    console.log(`Adding recipe "${recipe.name}" to state.`);
    return recipeAdapter.addOne(recipe, { ...state, adding: false });
  }),
  on(RecipeActions.addRecipeFailure, (state, { error }) => ({
    ...state,
    adding: false,
    error,
  })),

  //Update
  on(RecipeActions.updateRecipe, (state) => ({
    ...state,
    updating: true,
    error: null,
  })),
  on(RecipeActions.updateRecipeSuccess, (state, { id, changes }) => {
    console.log(`Updating recipe with ID "${id}" in state.`);
    return recipeAdapter.updateOne({ id, changes }, { ...state, updating: false });
  }),
  on(RecipeActions.updateRecipeFailure, (state, { error }) => ({
    ...state,
    updating: false,
    error,
  })),

  //Delete
  on(RecipeActions.deleteRecipe, (state) => ({
    ...state,
    deleting: true,
    error: null,
  })), 
  on(RecipeActions.deleteRecipeSuccess, (state, { id }) => {
    console.log(`Removing recipe with ID "${id}" from state.`);
    return recipeAdapter.removeOne(id, { ...state, deleting: false });
  }),
  on(RecipeActions.deleteRecipeFailure, (state, { error }) => ({
    ...state,
    deleting: false,
    error,
  })) 
);



// import { createEntityAdapter, EntityState } from '@ngrx/entity';
// import { createReducer, on } from '@ngrx/store';
// import * as RecipeActions from './recipe.actions';
// import { Recipe } from 'src/app/interfaces/recipe_functions.interface';

// export interface RecipeState extends EntityState<Recipe> {
//   loading: boolean;
//   error: any;
// }

// export const recipeAdapter = createEntityAdapter<Recipe>({
//   selectId: (recipe) => recipe.id as string,
// });

// export const initialState: RecipeState = recipeAdapter.getInitialState({
//   loading: false,
//   error: null,
// });

// export const recipeReducer = createReducer(
//   initialState,
//   on(RecipeActions.loadRecipes, (state) => ({
//     ...state,
//     loading: true,
//   })),
//   on(RecipeActions.loadRecipesSuccess, (state, { recipes }) =>
//     recipeAdapter.setAll(recipes, { ...state, loading: false })
//   ),
//   on(RecipeActions.loadRecipesFailure, (state, { error }) => ({
//     ...state,
//     loading: false,
//     error,
//   })),
//   on(RecipeActions.addRecipeSuccess, (state, { recipe }) =>
//     recipeAdapter.addOne(recipe, state)
//   ),
//   on(RecipeActions.updateRecipeSuccess, (state, { id, changes }) =>
//     recipeAdapter.updateOne({ id, changes }, state)
//   ),
//   on(RecipeActions.deleteRecipeSuccess, (state, { id }) =>
//     recipeAdapter.removeOne(id, state)
//   )
// );
