import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Poutine', 
  //     'This is simple', 
  //     'https://upload.wikimedia.org/wikipedia/commons/f/fd/Poutine_with_Bacon_%40_La_Belle_Province_%40_Montreal_%2829773379023%29.jpg',
  //     [
  //       new Ingredient("French Fries", 10),
  //       new Ingredient("Bacon", 5),
  //     ]),
  //   new Recipe(
  //     'Feijoada', 
  //     'So delicious', 
  //     'https://i0.statig.com.br/bancodeimagens/2m/x8/6n/2mx86nv7kxv8cybegti6zvw0t.jpg',
  //     [
  //       new Ingredient("Beans", 1),
  //       new Ingredient("Meat", 2)
  //     ])
  // ];

  private recipes : Recipe[] = [];
  
  constructor() { }

  getRecipes(){
    //return a new array with the same content
    return this.recipes.slice();
  }

  getRecipesCount(): number{
    return this.recipes.length;
  } 

  getRecipe(index: number){
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  editRecipe(index: number, recipeEdit: Recipe){
    this.recipes[index] = recipeEdit;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }

  setRecipes( recipes : Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

}
