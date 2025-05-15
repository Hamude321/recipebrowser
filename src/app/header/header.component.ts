import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle } from "@ionic/angular/standalone";

@Component({
  selector: 'header-custom',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonTitle, IonToolbar, CommonModule,IonHeader]
})
export class HeaderComponent  implements OnInit {
  @Input() headerTitle: string = '';
  
  constructor() { }

  ngOnInit() {}

}
