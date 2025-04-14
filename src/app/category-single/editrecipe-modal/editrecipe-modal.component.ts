import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonCard, IonImg,IonHeader,IonToolbar,IonTitle, IonItem,IonButtons, 
  IonCardHeader, IonCardTitle, IonButton, IonCardContent, IonLabel, IonSelect, 
  IonModal, IonContent, IonInput,IonSelectOption,IonIcon } from "@ionic/angular/standalone";
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Recipe } from 'src/app/interfaces/recipe_functions.interface';
import { Store } from '@ngrx/store';
import { addCategory } from 'src/app/services/store/category/category.actions';
import { Observable, take } from 'rxjs';
import { selectAllCategories } from 'src/app/services/store/category/category.selector';

@Component({
  selector: 'editrecipe-modal',
  templateUrl: './editrecipe-modal.component.html',
  styleUrls: ['./editrecipe-modal.component.scss'],
  imports:[ CommonModule, FormsModule, IonHeader, IonToolbar,IonButton,IonTitle, IonButtons, IonItem,IonLabel,IonSelect,IonSelectOption, IonContent,IonInput],
  standalone: true,
  providers: [ModalController]
})
export class EditrecipeModalComponent  implements OnInit {
  @Input() recipe!: Recipe;
  // @Input() categories: string[] = [];

  store: Store = inject(Store);
  categories$: Observable<string[]> = this.store.select(selectAllCategories);
  changes: Partial<Recipe> = {};
  newCategory: string = '';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.changes = { ...this.recipe };
  }

  onSaveClicked() {
    const updatedRecipe: Partial<Recipe> = {
      id: this.recipe.id,
      name: this.changes.name,
      category: this.changes.category,
      pictureUrl: this.changes.pictureUrl,
    };
    this.modalCtrl.dismiss(updatedRecipe);
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  addCategory() {
    const trimmed = this.newCategory.trim();
    if (!trimmed) {
      alert('Please enter a valid category name');
      return;
    }
  
    this.categories$.pipe(take(1)).subscribe((cats) => {
      if (cats.includes(trimmed)) {
        alert('Category already exists!');
        return;
      }
  
      this.store.dispatch(addCategory({ category: trimmed }));
      this.changes.category = trimmed;
      this.newCategory = '';
    });
  }
  
}
