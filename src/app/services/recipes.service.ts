import { Injectable, signal } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Recipe, RecipeResponse } from '../interfaces/recipe_functions.interface';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  constructor() { }
  

  // recipeSig:Observable<Recipe[]> = of([])
  //categoriesSig = signal<string[]>([])

  getRecipes$(): Observable<Recipe[]> {
    const recipes: any = [
      {
        name: 'Burger',
        category: 'Fast Food',
        pictureUrl: 'assets/img/fisch.jpg' 
      },
      {
        name: 'Pizza',
        category: 'Fast Food',
        pictureUrl: 'assets/img/pizza.jpg' 
      },
      {
        name: 'Pizza',
        category: 'Fast Food',
        pictureUrl: 'assets/img/pizza.jpg' 
      },
      {
        name: 'Pizza',
        category: 'Fast Food',
        pictureUrl: 'assets/img/pizza.jpg' 
      },
      {
        name: 'Pizza',
        category: 'Fast Food',
        pictureUrl: 'assets/img/pizza.jpg' 
      },
      {
        name: 'Pasta',
        category: 'Italian',
        pictureUrl: 'assets/img/nudeln.jpg' 
      },
      {
        name: 'Qusa',
        category: 'Sawane',
        pictureUrl: 'assets/img/frucht.jpg' 
      },
      {
        name: 'Burger',
        category: 'Fast Food',
        pictureUrl: 'assets/img/fisch.jpg' 
      },
      {
        name: 'Pizza',
        category: 'Fast Food',
        pictureUrl: 'assets/img/pizza.jpg' 
      },
      {
        name: 'Pizza',
        category: 'Fast Food',
        pictureUrl: 'assets/img/pizza.jpg' 
      },
      {
        name: 'Pizza',
        category: 'Fast Food',
        pictureUrl: 'assets/img/pizza.jpg' 
      },
      {
        name: 'Pizza',
        category: 'Fast Food',
        pictureUrl: 'assets/img/pizza.jpg' 
      },
      {
        name: 'Pasta',
        category: 'Italian',
        pictureUrl: 'assets/img/nudeln.jpg' 
      },
      {
        name: 'Qusa',
        category: 'Sawane',
        pictureUrl: 'assets/img/frucht.jpg' 
      },
      {
        name: 'Burger',
        category: 'Fast Food',
        pictureUrl: 'assets/img/fisch.jpg' 
      },
      {
        name: 'Pizza',
        category: 'Fast Food',
        pictureUrl: 'assets/img/pizza.jpg' 
      },
      {
        name: 'Pizza',
        category: 'Fast Food',
        pictureUrl: 'assets/img/pizza.jpg' 
      },
      {
        name: 'Pizza',
        category: 'Fast Food',
        pictureUrl: 'assets/img/pizza.jpg' 
      },
      {
        name: 'Pizza',
        category: 'Fast Food',
        pictureUrl: 'assets/img/pizza.jpg' 
      },
      {
        name: 'Pasta',
        category: 'Italian',
        pictureUrl: 'assets/img/nudeln.jpg' 
      },
      {
        name: 'Qusa',
        category: 'Sawane',
        pictureUrl: 'assets/img/frucht.jpg' 
      },
    ]
    return of(recipes);
  }

  getCategories$(): Observable<string[]> {
    const categories: any = [
      'Fast Food',
      'Italian',
      'Sawane'
    ]
    return of(categories);
  }
}
