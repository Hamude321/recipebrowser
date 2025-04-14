import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { environment } from './environments/environment.prod';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideStore } from '@ngrx/store';
import { recipeReducer } from './app/services/store/recipe/recipe.reducer';
import { provideEffects } from '@ngrx/effects';
import { RecipeEffects } from './app/services/store/recipe/recipe.effects';
import { CategoryEffects } from './app/services/store/category/category.effects';
import { categoryReducer } from './app/services/store/category/category.reducer';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),  

    provideStore({ recipes: recipeReducer, categories: categoryReducer }),
    provideEffects([RecipeEffects, CategoryEffects])
  ],
});
