import { createReducer, on } from '@ngrx/store';
import * as CategoryActions from './category.actions';

export interface CategoryState {
  categories: string[];
  error: string | null;
  loading: boolean;
}

export const initialState: CategoryState = {
  categories: [],
  error: null,
  loading: false,
};

export const categoryReducer = createReducer(
  initialState,
  on(CategoryActions.loadCategories, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(CategoryActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    categories: categories,
    loading: false,
  })),
  on(CategoryActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false,
  })),
  on(CategoryActions.addCategorySuccess, (state, { category }) => ({
    ...state,
    categories: [...state.categories, category],
    loading: false,
    error: null,  
  })),
  on(CategoryActions.addCategoryFailure, (state, { error }) => ({
    ...state,
    loading: false, 
    error: error,   
  })),
  on(CategoryActions.removeCategorySuccess, (state, { categoryName }) => {
    console.log(`Removing category "${categoryName}" from state.`);
    return {
      ...state,
      categories: state.categories.filter((c) => c !== categoryName),
    };
  }),
  on(CategoryActions.removeCategoryFailure, (state, { error }) => ({
    ...state,
    error: error,
  }))
);
