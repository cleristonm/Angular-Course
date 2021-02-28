import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, 
      private recipeService : RecipeService) { }

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
    return this.http
      .get<Recipe[]>('https://ng-recipe-book-course-bb7b7-default-rtdb.firebaseio.com/recipes.json')
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
          this.recipeService.setRecipes( recipes )
        })
      )

  }
}
