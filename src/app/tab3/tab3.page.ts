import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonImg, IonButton,IonSelectOption,IonSelect,IonInput, IonIcon } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import * as icons from 'ionicons/icons';


import { Recipe } from '../interfaces/recipe_functions.interface';
import { SupabaseService } from '../services/supabase/supabase.service';
import { addRecipe, deleteRecipe, loadRecipes } from '../services/store/recipe/recipe.actions';
import { addCategory, loadCategories, removeCategory } from '../services/store/category/category.actions';
import { selectAllCategories } from '../services/store/category/category.selector';
import { CommonModule } from '@angular/common';
import { selectAllRecipes } from '../services/store/recipe/recipe.selectors';
import { RecipeFormComponent } from "../recipe-form/recipe-form.component";

//Recipe browser
//runter scrollen
//edit button
//category edit recipe
//pictures phone

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ReactiveFormsModule, FormsModule, CommonModule, RecipeFormComponent],
})
export class Tab3Page implements OnInit {
  @ViewChild(RecipeFormComponent) recipeFormComponent?: RecipeFormComponent;
  store: Store = inject(Store);
  categories$ = this.store.select(selectAllCategories);

  constructor() {
    addIcons({ ...icons });
  }

  ngOnInit(): void {
    this.store.dispatch(loadRecipes());
    this.store.dispatch(loadCategories());
  }

  submitRecipe(recipe: Partial<Recipe>) {
    this.store.dispatch(addRecipe({ recipe: recipe as Recipe }));
  }
}
