import { Routes } from '@angular/router';
import { Tab1Page } from './Tab-Recipes/tab1.page';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  { path: 'home',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes), },
  {
    path: 'tab4',
    loadComponent: () => import('./Tab-Extras/tab4.page').then( m => m.Tab4Page)
  },
];
