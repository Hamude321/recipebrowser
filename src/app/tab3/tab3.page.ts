import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonImg, IonButton,IonSelectOption,IonSelect,IonInput, IonIcon } from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AlertController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import * as icons from 'ionicons/icons';


import { Recipe } from '../interfaces/recipe_functions.interface';
import { RecipesFirestoreService } from '../services/firestore/recipes-firestore.service';
import { SupabaseService } from '../services/supabase/supabase.service';
import { addRecipe, deleteRecipe, loadRecipes } from '../services/store/recipe/recipe.actions';
import { addCategory, loadCategories, removeCategory } from '../services/store/category/category.actions';
import { selectAllCategories } from '../services/store/category/category.selector';
import { CommonModule } from '@angular/common';
import { selectAllRecipes } from '../services/store/recipe/recipe.selectors';

//Recipe browser
//runter scrollen
//edit button
//category edit recipe
//pictures phone

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  imports: [IonIcon, IonButton, IonImg, IonLabel, IonItem, IonHeader, IonToolbar, IonTitle, IonContent,ReactiveFormsModule, FormsModule,CommonModule,IonSelectOption,IonSelect,IonInput],
})
export class Tab3Page implements OnInit {

  supabaseService: SupabaseService = inject(SupabaseService);
  store: Store = inject(Store);
  private alertController: AlertController = inject(AlertController);

  recipeForm: FormGroup;
  recipes$ = this.store.select(selectAllRecipes);
  categories$ = this.store.select(selectAllCategories); 
  isSubmitting = false;
  newCategory: string = '';
  selectedFile!: File;
  imageUrl: string = '';
  selectedRecipe: string | null = null; 


  constructor(private fb: FormBuilder, private recipesService: RecipesFirestoreService) {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      pictureUrl: [''],
    });
    addIcons({ ...icons });
  }

  ngOnInit(): void {
    this.store.dispatch(loadRecipes()); 
    this.store.dispatch(loadCategories()); 
  }

  async submitRecipe() {
    if (this.recipeForm.invalid) {
      alert('Please fill all fields!');
      return;
    }

    this.isSubmitting = true;

    let uploadedImageUrl: string | null = null;
    if (this.selectedFile) {
      uploadedImageUrl = await this.supabaseService.uploadImage(this.selectedFile);
      if (!uploadedImageUrl) {
        alert('Image upload failed');
        this.isSubmitting = false;
        return;
      }
    }

    const recipeData: Recipe = {
      ...this.recipeForm.value,
      pictureUrl: uploadedImageUrl ?? '',
    };

    this.store.dispatch(addRecipe({ recipe: recipeData }));

    this.recipeForm.reset();
    this.imageUrl = '';
    this.isSubmitting = false;
  }

  addCategory(newCategory: string) {
    if (!newCategory.trim()) {
      alert('Please enter a valid category name');
      return;
    }

    this.store.dispatch(addCategory({ category: newCategory }));
    this.newCategory = '';
  }

  removeCategory() {
    const selectedCategory = this.recipeForm.controls['category'].value;
  
    if (!selectedCategory) {
      alert('Please select a category to delete.');
      return;
    }
  
    const confirmation = confirm(`Are you sure you want to delete the category: "${selectedCategory}"?`);
  
    if (confirmation) {
      this.store.dispatch(removeCategory({ categoryName: selectedCategory }));
      this.recipeForm.controls['category'].setValue('');
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file) return;
  
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      return;
    }
  
    this.selectedFile = file;
  
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  

  deleteRecipe() {
    if (this.selectedRecipe) {
      this.store.dispatch(deleteRecipe({ id: this.selectedRecipe }));
    }
  }

  async categoryChanged(event: any) {
    if (event.detail.value === '__new__') {
      await this.promptNewCategory();
      // Reset the select to prevent accidental submission of "__new__"
      this.recipeForm.patchValue({ category: '' });
    }
  }

  async promptNewCategory() {
    const alert = await this.alertController.create({
      header: 'Add New Category',
      inputs: [
        {
          name: 'newCategory',
          type: 'text',
          placeholder: 'Enter new category name',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Add Category cancelled');
          },
        },
        {
          text: 'Add',
          handler: (data) => {
            if (data.newCategory.trim()) {
              // Add the new category to the store
              this.addCategory(data.newCategory);
              
              // Automatically select the newly added category
              this.recipeForm.controls['category'].setValue(data.newCategory);
            } else {
              alert.message = 'Please enter a valid category name';
            }
          },
        },
      ],
    });
    await alert.present();
  }
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput?.click();
  }
    
}
