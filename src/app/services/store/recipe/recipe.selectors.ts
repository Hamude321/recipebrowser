import { createFeatureSelector, createSelector } from '@ngrx/store';
import { recipeAdapter, RecipeState } from './recipe.reducer';

export const selectRecipeState = createFeatureSelector<RecipeState>('recipes');

const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal,
} = recipeAdapter.getSelectors(selectRecipeState);

export const selectAllRecipes = selectAll;
export const selectRecipeEntities = selectEntities;
export const selectRecipeIds = selectIds;
export const selectRecipeTotal = selectTotal;

export const selectLoading = createSelector(
  selectRecipeState,
  (state) => state.loading
);

export const selectAdding = createSelector(
  selectRecipeState,
  (state: RecipeState) => state.adding
);

export const selectUpdating = createSelector(
  selectRecipeState,
  (state: RecipeState) => state.updating
);

export const selectDeleting = createSelector(
  selectRecipeState,
  (state: RecipeState) => state.deleting
);

export const selectRecipeById = (id: string) =>
  createSelector(selectRecipeEntities, (entities) => entities[id]);

export const selectFilteredRecipes = (search: string) =>
  createSelector(selectAllRecipes, (recipes) =>
    recipes.filter((r) =>
      r.name.toLowerCase().includes(search.toLowerCase())
    )
  );
