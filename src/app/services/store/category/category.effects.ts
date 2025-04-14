import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { RecipesFirestoreService } from 'src/app/services/firestore/recipes-firestore.service';
import * as CategoryActions from './category.actions';
import { catchError, map, mergeMap, switchMap } from 'rxjs';
import { of } from 'rxjs';
import { Category } from 'src/app/interfaces/recipe_functions.interface';

@Injectable()
export class CategoryEffects {

  constructor(
    private actions$: Actions,
    private recipesService: RecipesFirestoreService,
    private store: Store
  ) {}

  // Effect to load categories from Firestore
  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.loadCategories),
      mergeMap(() =>
        this.recipesService.getCategories$().pipe(
          map((categories: string[]) =>
            CategoryActions.loadCategoriesSuccess({ categories })
          ),
          catchError((error) =>
            of(CategoryActions.loadCategoriesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  // Effect to add a category
  addCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.addCategory),
      mergeMap(({ category }) =>
        this.recipesService.addCategory$(category).pipe(
          map(() => CategoryActions.addCategorySuccess({ category })),
          catchError((error) =>
            of(CategoryActions.loadCategoriesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  removeCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.removeCategory),
      mergeMap(({ categoryName }) =>
        this.recipesService.categoryHasRecipes$(categoryName).pipe(
          switchMap((hasRecipes) => {
            if (hasRecipes) {
              console.warn(`Category "${categoryName}" has recipes. Preventing deletion.`);
              return of(
                CategoryActions.removeCategoryFailure({
                  error: `Category "${categoryName}" has recipes and cannot be deleted.`,
                })
              );
            }
  
            return this.recipesService.removeCategory$(categoryName).pipe(
              map(() =>
                CategoryActions.removeCategorySuccess({ categoryName })
              ),
              catchError((error) =>
                of(CategoryActions.removeCategoryFailure({ error }))
              )
            );
          })
        )
      )
    )
  );
  
  
}
