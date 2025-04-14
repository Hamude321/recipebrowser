import { inject, Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { from, map, Observable, switchMap, throwError } from 'rxjs';
import { Category, Recipe } from 'src/app/interfaces/recipe_functions.interface';

@Injectable({
  providedIn: 'root'
})
export class RecipesFirestoreService {

  constructor() { }

  firestore = inject(Firestore)
  recipesCollection = collection(this.firestore, 'recipes')
  categoryCollection = collection(this.firestore, 'categories')

  //Recipes
  getRecipes$(): Observable<Recipe[]> {
    return collectionData(this.recipesCollection, {idField: 'id'}) as Observable<Recipe[]>;
  }

  addRecipe$(recipe: Recipe): Observable<string> {
    const recipeToCreate = {
      name: recipe.name,
      category: recipe.category,
      pictureUrl: recipe.pictureUrl ?? ''
    };
    const promise = addDoc(this.recipesCollection, recipeToCreate).then(
      (response) => response.id
      );
    return from(promise); 
  }

  removeRecipe$(recipeId: string): Observable<void> {
    const docRef = doc(this.firestore, 'recipes/' + recipeId);
    const promise = deleteDoc(docRef);
    return from(promise);
  }

  updateRecipe$(recipeId: string, dataToUpdate: Partial<Recipe>): Observable<void> {
    const docRef = doc(this.firestore, 'recipes/' + recipeId);
    const promise = updateDoc(docRef, dataToUpdate); // note: updateDoc allows partial
    return from(promise);
  }

  //Categories
  getCategories$(): Observable<string[]> {
    return collectionData(this.categoryCollection, { idField: 'id' }).pipe(
      map(categories => categories.map(category => (category as any).name))
    );
  }

  addCategory$(category: string): Observable<string> {
    return this.categoryExists$(category).pipe(
      switchMap(exists => {
        if (exists) {
          return throwError('Category already exists');
        }

        const categoryToCreate = { name: category };
        const promise = addDoc(this.categoryCollection, categoryToCreate).then(
          (response) => response.id 
        );
        return from(promise); 
      })
    );
  }

  categoryExists$(categoryName: string): Observable<boolean> {
    const categoryQuery = query(
      this.categoryCollection,
      where('name', '==', categoryName)
    );

    return from(getDocs(categoryQuery)).pipe(
      map(snapshot => !snapshot.empty)  
    );
  }

  categoryHasRecipes$(categoryName: string): Observable<boolean> {
    const categoryQuery = query(
      this.recipesCollection,
      where('category', '==', categoryName)
    );

    return from(getDocs(categoryQuery)).pipe(
      map(snapshot => snapshot.size > 0) 
    );
  }

  removeCategory$(categoryName: string): Observable<void> {
    const categoryQuery = query(
      this.categoryCollection,
      where('name', '==', categoryName)
    );

    return from(getDocs(categoryQuery)).pipe(
      switchMap(snapshot => {
        if (!snapshot.empty) {
          const docRef = snapshot.docs[0].ref;
          return from(deleteDoc(docRef));  
        } else {
          return throwError('Category does not exist');
        }
      })
    );
  }


}
