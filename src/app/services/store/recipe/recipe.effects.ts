import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { RecipesFirestoreService } from '../../firestore/recipes-firestore.service';
import * as RecipeActions from './recipe.actions';
import { catchError, map, mergeMap, of, switchMap } from 'rxjs';

@Injectable()
export class RecipeEffects {
  constructor(
    private actions$: Actions,
    private recipeService: RecipesFirestoreService
  ) {}

  loadRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.loadRecipes),
      switchMap(() =>
        this.recipeService.getRecipes$().pipe(
          map((recipes) =>
            RecipeActions.loadRecipesSuccess({ recipes })
          ),
          catchError((error) =>
            of(RecipeActions.loadRecipesFailure({ error }))
          )
        )
      )
    )
  );

  addRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.addRecipe),
      mergeMap(({ recipe }) =>
        this.recipeService.addRecipe$(recipe).pipe(
          map((id) =>
            RecipeActions.addRecipeSuccess({ recipe: { ...recipe, id } })
          ),
          catchError((error) =>
            of(RecipeActions.addRecipeFailure({ error }))
          )
        )
      )
    )
  );
  
  updateRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.updateRecipe),
      mergeMap(({ id, changes }) =>
        this.recipeService.updateRecipe$(id, changes).pipe(
          map(() =>
            RecipeActions.updateRecipeSuccess({ id, changes })
          ),
          catchError((error) =>
            of(RecipeActions.updateRecipeFailure({ error }))
          )
        )
      )
    )
  );

  deleteRecipe$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RecipeActions.deleteRecipe),
      mergeMap(({ id }) =>
        this.recipeService.removeRecipe$(id).pipe(
          map(() =>
            RecipeActions.deleteRecipeSuccess({ id })
          ),
          catchError((error) =>
            of(RecipeActions.deleteRecipeFailure({ error }))
          )
        )
      )
    )
  );
}
