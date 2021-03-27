import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { Recipe } from "../recipes/recipe.model";
import * as RecipesActions from './recipe.actions'
import * as fromApp from '../../store/app.reducer';
import { Store } from "@ngrx/store";



@Injectable()
export class RecipeEffects {

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap( () => {
            return this.http.get<Recipe[]>(
                'https://ng-recipe-book-course-bb7b7-default-rtdb.firebaseio.com/recipes.json',        
            );
        }),
        map( recipes => {
            // the map above is a rxjs operator
            // the map bellow is a javascript operator
            return recipes.map( recipe => {
              //return a copy o recipes with a empty array of ingredients, when the
              //recipe does not have ingredients
                return {
                    ...recipe, 
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                };
            });
        }),
        map( recipes => {
            return new RecipesActions.SetRecipes(recipes);
        })      
    );

    @Effect({dispatch: false})
    storeRecipes = this.actions$.pipe(
        ofType(RecipesActions.STORE_RECIPES),
        withLatestFrom(this.store.select('recipes')),
        switchMap( ([actionData, recipesState]) => {
            return this.http.put(
                'https://ng-recipe-book-course-bb7b7-default-rtdb.firebaseio.com/recipes.json',
                recipesState.recipes,
             )

        })
    );


    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private store: Store<fromApp.AppState>
    ) {}
}