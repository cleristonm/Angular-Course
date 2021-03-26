import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { RecipeService } from '../recipes/recipe.service';
import {  map,  tap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipes/recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  
  constructor(private http: HttpClient, 
      private recipeService : RecipeService,
      private store: Store<fromApp.AppState>) { }

  storeRecipes(){
    const recipes = this.recipeService.getRecipes();
    this.http.put(
        'https://ng-recipe-book-course-bb7b7-default-rtdb.firebaseio.com/recipes.json',
        recipes,
     ).subscribe(
       response => {
         console.log(response)
       }
     )
    
  }

  fetchData(){

    //https://www.udemy.com/course/the-complete-guide-to-angular-2/learn/lecture/14466438#notes
    return this.http.get<Recipe[]>(
        'https://ng-recipe-book-course-bb7b7-default-rtdb.firebaseio.com/recipes.json',        
    )
    .pipe( 
    
      map( recipes => {
          // the map above is a rxjs operator
          // the map bellow is a javascript operator
          return recipes.map( recipes => {
            //return a copy o recipes with a empty array of ingredients, when the
            //recipe does not have ingredients
            return {...recipes, ingredients: recipes.ingredients ? recipes.ingredients : []}
          });
        }),
        //the tap method allow us to get the result data e use it
        //in this way we do not need to implement a subscribe here
        tap( recipes => {
          // this.recipeService.setRecipes( recipes )
          this.store.dispatch(new RecipesActions.SetRecipes(recipes))
        })    
      
    );

    
      

  }
}
