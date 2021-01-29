import { Injectable, EventEmitter } from '@angular/core';

import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Poutine', 'This is simple', 'https://www.seriouseats.com/recipes/images/2015/03/20150327-poutine-joshua-bousel.jpg'),
    new Recipe('Feijoada', 'So delicious', 'https://i0.statig.com.br/bancodeimagens/2m/x8/6n/2mx86nv7kxv8cybegti6zvw0t.jpg')
  ];

  constructor() { }

  getRecipes(){
    //return a new array with the same content
    return this.recipes.slice();
  }


}
