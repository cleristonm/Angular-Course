import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Poutine', 
      'This is simple', 
      'https://upload.wikimedia.org/wikipedia/commons/f/fd/Poutine_with_Bacon_%40_La_Belle_Province_%40_Montreal_%2829773379023%29.jpg',
      [
        new Ingredient("French Fries", 10),
        new Ingredient("Bacon", 5),
      ]),
    new Recipe(
      'Feijoada', 
      'So delicious', 
      'https://i0.statig.com.br/bancodeimagens/2m/x8/6n/2mx86nv7kxv8cybegti6zvw0t.jpg',
      [
        new Ingredient("Beans", 1),
        new Ingredient("Meat", 2)
      ])
  ];

  constructor() { }

  getRecipes(){
    //return a new array with the same content
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addRecipe(name: string, description: string, imagePath: string){
    const recipeAdd : Recipe = new Recipe(name, description, imagePath, null);
    this.recipes.push(recipeAdd);
  }

  editRecipe(index: number, name: string, description: string, imagePath: string){
    const recipeEdit : Recipe = new Recipe(name, description, imagePath, null);
    this.recipes[index] = recipeEdit;
  }


}
