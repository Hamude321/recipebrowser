import { createAction, props } from '@ngrx/store';

// Existing actions
export const loadCategories = createAction('[Category] Load Categories');
export const loadCategoriesSuccess = createAction(
  '[Category] Load Categories Success',
  props<{ categories: string[] }>()
);
export const loadCategoriesFailure = createAction(
  '[Category] Load Categories Failure',
  props<{ error: any }>()
);

export const addCategory = createAction(
  '[Category] Add Category',
  props<{ category: string }>()
);
export const addCategorySuccess = createAction(
  '[Category] Add Category Success',
  props<{ category: string }>()
);
export const addCategoryFailure = createAction(
  '[Category] Add Category Failure',
  props<{ error: any }>()
);

export const removeCategory = createAction(
  '[Category] Remove Category',
  props<{ categoryName: string }>()
);

export const removeCategorySuccess = createAction(
  '[Category] Remove Category Success',
  props<{ categoryName: string }>()
);

export const removeCategoryFailure = createAction(
  '[Category] Remove Category Failure',
  props<{ error: any }>()
);
