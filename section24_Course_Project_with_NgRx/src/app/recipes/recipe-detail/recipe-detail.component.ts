import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe : Recipe;
  subscription : Subscription;
  selectedId: number;

  constructor(private slService: ShoppingListService,
    private recipeService: RecipeService, 
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {    
    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.selectedId = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.selectedId);
      }
    )
    console.log(this.recipe);
  }
  
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  addIngredientsToShoppingList(){
    // this.recipe.ingredients.forEach(ingredient => {
    //   this.slService.addIngredient(ingredient);      
    //   console.log(ingredient);
    // });
    
    this.slService.addIngredients(this.recipe.ingredients);
  }

  onDeleteRecipe(){
    if (confirm("Are you sure to delete this recipe: "+this.recipe.name)) {
      this.recipeService.deleteRecipe(this.selectedId);
      this.router.navigate(['/recipes']);
    }
  }

}
