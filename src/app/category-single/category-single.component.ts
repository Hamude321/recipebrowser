import { CommonModule, NgClass, NgOptimizedImage } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Recipe, RecipeResponse } from 'src/app/interfaces/recipe_functions.interface';
import { IonCard, IonImg, IonItem, IonCardHeader, IonCardTitle, IonButton, IonCardContent, IonLabel, IonModal, IonContent, IonInput } from "@ionic/angular/standalone";
import { Store } from '@ngrx/store';
import { updateRecipe } from '../services/store/recipe/recipe.actions';
import { selectAllCategories } from '../services/store/category/category.selector';
import { ModalController } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { EditrecipeModalComponent } from './editrecipe-modal/editrecipe-modal.component';
import { ImageModalComponent } from './image-modal/image-modal.component';

@Component({
  selector: 'category-single',
  templateUrl: './category-single.component.html',
  styleUrls: ['./category-single.component.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, IonImg ],
  providers: [ModalController]
})
export class CategorySingleComponent  {
  @Input() category: string = ''
  @Input() recipes: Recipe[] = [];
  store: Store = inject(Store);
  isEditing = false;
  categories$ = this.store.select(selectAllCategories); 
  private modalController: ModalController = inject(ModalController);

  constructor() { }

  selectedRecipeForEdit: Recipe | null = null;

  async openImage(recipe: Recipe) {
    const modal = await this.modalController.create({
      component: ImageModalComponent,
      componentProps: { recipe },
      breakpoints: [0, 0.8, 1],
      initialBreakpoint: 0.8,
      backdropDismiss: true,
    });
  
    modal.onDidDismiss().then((res) => {
      if (res.data?.action === 'edit') {
        this.enableEdit(res.data.recipe);
      }
    });
  
    await modal.present();
  }
  
  closeImage() {
    this.isEditing = false;
    this.selectedRecipeForEdit = null;
  }

  async enableEdit(recipe: Recipe) {
    const categories = await firstValueFrom(this.categories$);
    const modal = await this.modalController.create({
      component: EditrecipeModalComponent,
      componentProps: { recipe, categories },
      breakpoints: [0, 0.8, 1],
      initialBreakpoint: 0.8,
      backdropDismiss: true,
    });
  
    modal.onDidDismiss().then((res) => {
      const updatedRecipe = res.data;
      if (updatedRecipe) {
        this.selectedRecipeForEdit = updatedRecipe;
        this.saveChanges(updatedRecipe);
        this.openImage(updatedRecipe);
      } else {
        this.openImage(recipe);
      }
      
    });

    await modal.present();
  }
  
  saveChanges(changes: Partial<Recipe>) {
    if (!this.selectedRecipeForEdit?.id) return;
  
    console.log('Saving changes:', changes);
  
    this.store.dispatch(updateRecipe({
      id: this.selectedRecipeForEdit.id,
      changes
    }));
  
    this.closeImage(); 
  }
    

  logChange(value: string) {
    console.log('Input changed to:', value);
  }
}
