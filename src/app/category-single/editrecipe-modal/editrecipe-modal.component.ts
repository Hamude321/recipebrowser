import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonCard, IonImg,IonHeader,IonToolbar,IonTitle, IonItem,IonButtons, 
  IonCardHeader, IonCardTitle, IonButton, IonCardContent, IonLabel, IonSelect, 
  IonModal, IonContent, IonInput,IonSelectOption,IonIcon } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import { Recipe } from 'src/app/interfaces/recipe_functions.interface';
import { Store } from '@ngrx/store';
import { addCategory } from 'src/app/services/store/category/category.actions';
import { Observable, take } from 'rxjs';
import { selectAllCategories } from 'src/app/services/store/category/category.selector';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RecipeFormComponent } from "../../recipe-form/recipe-form.component";
import { updateRecipe } from 'src/app/services/store/recipe/recipe.actions';

@Component({
  selector: 'editrecipe-modal',
  templateUrl: './editrecipe-modal.component.html',
  styleUrls: ['./editrecipe-modal.component.scss'],
  imports: [CommonModule, FormsModule, IonHeader, IonToolbar, IonButton, IonTitle, IonButtons,IonContent,  ReactiveFormsModule, RecipeFormComponent],
  standalone: true,
  providers: [ModalController]
})
export class EditrecipeModalComponent {
  @Input() recipe!: Recipe;

  constructor(private modalCtrl: ModalController) {}

  submitChanges(updatedData: Partial<Recipe>) {
    if (!this.recipe?.id) return;
    this.modalCtrl.dismiss(updatedData); 
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }
  
  
}
