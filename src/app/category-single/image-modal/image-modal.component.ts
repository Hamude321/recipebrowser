import { Component, inject, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/interfaces/recipe_functions.interface';
import { ModalController,AlertController  } from '@ionic/angular';
import { IonCard, IonImg,IonHeader,IonToolbar,IonTitle, IonItem,IonButtons, 
  IonCardHeader, IonCardTitle, IonButton, IonCardContent, IonLabel, IonSelect, 
  IonModal, IonContent, IonInput,IonSelectOption,IonIcon } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { deleteRecipe } from 'src/app/services/store/recipe/recipe.actions';
import { arrowBack, logOutOutline } from "ionicons/icons";
import { addIcons } from 'ionicons';
import * as icons from 'ionicons/icons';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
  providers: [ModalController],
  imports:[ CommonModule, FormsModule, IonHeader, IonToolbar,IonButton,IonTitle, IonButtons, IonContent,IonImg,IonIcon, ],
})
export class ImageModalComponent  implements OnInit {

  @Input() recipe!: Recipe;
  private alertCtrl: AlertController = inject(AlertController);
  

  constructor(private modalCtrl: ModalController, private store: Store) {
    addIcons({ ...icons });
  }
  ngOnInit(): void {
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  editRecipe() {
    this.modalCtrl.dismiss({ action: 'edit', recipe: this.recipe });
  }

  async deleteRecipe() {
    const alert = await this.alertCtrl.create({
      header: 'Confirm Deletion',
      message: 'Are you sure you want to delete this recipe?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',  // This will close the alert without doing anything
          handler: () => {
            console.log('Deletion cancelled');
          }
        },
        {
          text: 'Delete',
          cssClass: 'delete-button', // Add custom class to delete button
          handler: () => {
            if (this.recipe?.id) {
              this.store.dispatch(deleteRecipe({ id: this.recipe.id }));
            }
            this.closeModal();  // Close the current modal after deleting
          }
        }
      ]
    });
  
    await alert.present();
  }
}


