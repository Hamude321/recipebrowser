import { Component, inject, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { RegisterComponent } from "../users/register/register.component";
import { LoginComponent } from "../users/login/login.component";
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [IonButton, IonHeader, IonToolbar, IonTitle, IonContent, RegisterComponent, LoginComponent]
})
export class Tab2Page implements OnInit {

  constructor() {}
  authService = inject(AuthService)

  ngOnInit(): void {
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

  logout(){
    this.authService.logout();
  }

}
