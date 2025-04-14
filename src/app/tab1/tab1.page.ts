import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonList, IonItem } from '@ionic/angular/standalone';
import { RecipesService } from '../services/recipes.service';
import { CommonModule } from '@angular/common';
import { CategorySingleComponent } from "../category-single/category-single.component";
import { combineLatest, map, Observable } from 'rxjs';
import { Recipe, RecipeResponse } from '../interfaces/recipe_functions.interface';
import { RegisterComponent } from "../users/register/register.component";
import { AuthService } from '../services/auth/auth.service';
import { RecipesFirestoreService } from '../services/firestore/recipes-firestore.service';
import { Store } from '@ngrx/store';
import { selectAllCategories } from '../services/store/category/category.selector';
import { selectAdding, selectAllRecipes, selectDeleting, selectLoading, selectUpdating } from '../services/store/recipe/recipe.selectors';
import { loadCategories } from '../services/store/category/category.actions';
import { loadRecipes } from '../services/store/recipe/recipe.actions';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule, CategorySingleComponent],
})
export class Tab1Page implements AfterViewInit, OnInit {

  recipes$ = this.store.select(selectAllRecipes);
  categories$ = this.store.select(selectAllCategories);

  loading$ = this.store.select(selectLoading);
  adding$ = this.store.select(selectAdding);
  updating$ = this.store.select(selectUpdating);
  deleting$ = this.store.select(selectDeleting);

  categoriesWithRecipes$ = combineLatest([this.recipes$, this.categories$]).pipe(
    map(([recipes, categories]) =>
      categories.map(category => ({
        category,
        recipes: recipes.filter(recipe => recipe.category === category)
      }))
    )
  );

  constructor(private store: Store) {}

  ngAfterViewInit(): void {
    //console.log(this.recipes$)
    this.categoriesWithRecipes$.subscribe(data => console.log(data));
  }

  //Auth Stuff maybe move
  authService = inject(AuthService)

  ngOnInit(): void {
    this.store.dispatch(loadRecipes());
    this.store.dispatch(loadCategories());

      // Log the recipes and categories to the console
  this.store.select(selectAllRecipes).subscribe(recipes => {
    console.log('Recipes:', recipes); // Logs the recipes to the console
  });

  this.store.select(selectAllCategories).subscribe(categories => {
    console.log('Categories:', categories); // Logs the categories to the console
  });

    
    //auth
    this.authService.user$.subscribe(user => {
      if(user){
        this.authService.currentUserSig.set({
          email:user.email!,
          username: user.displayName!,
        });
      } else{
        this.authService.currentUserSig.set(null);
      }
      console.log(this.authService.currentUserSig())
    });
  }


}
