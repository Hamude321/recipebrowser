import { Routes } from '@angular/router';
import { Tab1Page } from './tab1/tab1.page';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  { path: 'home',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes), },
  {
    path: 'tab4',
    loadComponent: () => import('./tab4/tab4.page').then( m => m.Tab4Page)
  },
];
