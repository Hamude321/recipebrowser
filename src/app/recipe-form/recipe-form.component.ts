import { Component, Input, Output, EventEmitter, OnInit, inject, SimpleChanges, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonInput, IonButton, IonSelect, IonLabel, IonItem, IonContent, IonImg, IonIcon, IonHeader, IonToolbar, IonTitle, IonButtons,IonSelectOption } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { selectAllCategories } from '../services/store/category/category.selector';
import { addCategory, removeCategory } from '../services/store/category/category.actions';
import { SupabaseService } from '../services/supabase/supabase.service';
import { Recipe } from '../interfaces/recipe_functions.interface';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'recipe-form',
  standalone: true,
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
  imports: [CommonModule, IonButtons, IonTitle, IonToolbar, IonHeader, IonInput, IonButton, IonSelect, IonLabel, IonItem, IonContent, IonImg, IonIcon, ReactiveFormsModule, FormsModule,IonSelectOption],
})
export class RecipeFormComponent implements OnInit,OnChanges  {
  @Input() mode: 'edit' | 'add' = 'add';
  @Input() recipe: Recipe | null = null;
  @Output() formSubmitted = new EventEmitter<Partial<Recipe>>();
  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  store = inject(Store);
  fb = inject(FormBuilder);
  alertController = inject(AlertController);
  supabaseService = inject(SupabaseService);

  recipeForm!: FormGroup;
  categories$: Observable<string[]> = this.store.select(selectAllCategories);
  isSubmitting = false;
  selectedFile: File | null = null;
  imageUrl: string = '';
  showImageUpload = true;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['recipe']) {
      this.recipeForm?.patchValue({
        name: this.recipe?.name || '',
        category: this.recipe?.category || '',
      });
  
      this.imageUrl = this.recipe?.pictureUrl || '';
      this.selectedFile = null;

      if (this.fileInputRef?.nativeElement) {
        this.fileInputRef.nativeElement.value = '';
      }
    }
  }
  
  ngOnInit() {
    // this.showImageUpload = this.mode === 'add';
    this.recipeForm = this.fb.group({
      name: [this.recipe?.name || '', Validators.required],
      category: [this.recipe?.category || '', Validators.required],
    });

    if (this.recipe?.pictureUrl) {
      this.imageUrl = this.recipe.pictureUrl;
    }
  }

  async handleSubmit() {
    if (this.recipeForm.invalid) return;

    this.isSubmitting = true;

    let pictureUrl = this.recipe?.pictureUrl || '';

    if (this.selectedFile) {
      const uploaded = await this.supabaseService.uploadImage(this.selectedFile);
      if (!uploaded) {
        alert('Image upload failed');
        this.isSubmitting = false;
        return;
      }
      pictureUrl = uploaded;
    }

    const payload: Partial<Recipe> = {
      ...this.recipeForm.value,
      pictureUrl,
      id: this.recipe?.id, // for edit
    };

    this.formSubmitted.emit(payload);

    this.isSubmitting = false;
    this.recipeForm.reset();
    this.selectedFile = null;
    this.imageUrl = '';

    if (this.fileInputRef?.nativeElement) {
      this.fileInputRef.nativeElement.value = '';
    }
  }

  async categoryChanged(event: any) {
    if (event.detail.value === '__new__') {
      await this.promptNewCategory();
      this.recipeForm.patchValue({ category: '' });
    }
  }

  async promptNewCategory() {
    const alert = await this.alertController.create({
      header: 'Add New Category',
      inputs: [{ name: 'newCategory', type: 'text', placeholder: 'Enter new category name' }],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Add',
          handler: (data) => {
            if (data.newCategory.trim()) {
              this.store.dispatch(addCategory({ category: data.newCategory }));
              this.recipeForm.patchValue({ category: data.newCategory });
            } else {
              alert.message = 'Please enter a valid category';
            }
          },
        },
      ],
    });
    await alert.present();
  }

  removeCategory() {
    const category = this.recipeForm.value.category;
    if (!category) return;
    if (confirm(`Delete category "${category}"?`)) {
      this.store.dispatch(removeCategory({ categoryName: category }));
      this.recipeForm.patchValue({ category: '' });
    }
  }

  triggerFileInput() {
    this.fileInputRef?.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (!file?.type.startsWith('image/')) {
      alert('Please select an image.');
      return;
    }
  
    this.selectedFile = file;
  
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  
    (event.target as HTMLInputElement).value = '';
    console.log('File selected:', event.target.files[0]);
  }
}
