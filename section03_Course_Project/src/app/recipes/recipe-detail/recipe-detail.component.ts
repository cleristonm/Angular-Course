import { Component, Input, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe : Recipe;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
  }

  addIngredientsToShoppingList(){
    this.recipe.ingredients.forEach(ingredient => {
      this.slService.addIngredient(ingredient);      
      console.log(ingredient);
    });
    
  }

}
