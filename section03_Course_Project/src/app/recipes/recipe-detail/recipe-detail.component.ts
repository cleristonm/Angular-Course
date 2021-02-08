import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe : Recipe;

  constructor(private slService: ShoppingListService,
    private recipeService: RecipeService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {    
    this.route.params.subscribe(
      (params: Params) => {
        const id = +params['id'];
        this.recipe = this.recipeService.getRecipe(id);
      }
    )
    console.log(this.recipe);
  }
  

  addIngredientsToShoppingList(){
    // this.recipe.ingredients.forEach(ingredient => {
    //   this.slService.addIngredient(ingredient);      
    //   console.log(ingredient);
    // });
    
    this.slService.addIngredients(this.recipe.ingredients);
  }



}
