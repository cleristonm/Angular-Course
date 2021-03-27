import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes/recipe.model';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.action';
import * as fromApp from 'src/app/store/app.reducer';
import * as RecipesActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe : Recipe;
  subscription : Subscription;
  selectedId: number;

  constructor(
    private recipeService: RecipeService, 
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {    

    this.route.params
      .pipe(
          map(params => {
            return +params['id'];
          }),
          switchMap( id => {
            this.selectedId = id;
            return this.store.select('recipes');
          }),
          map( recipeState => {
            return recipeState.recipes.find((recipe, index) => {
              return index === this.selectedId;
            });
          })
      )
      .subscribe( recipe => {
        this.recipe = recipe;
      });
    
  }
  
  ngOnDestroy(){
    // this.subscription.unsubscribe();
  }

  addIngredientsToShoppingList(){
    // this.recipe.ingredients.forEach(ingredient => {
    //   this.slService.addIngredient(ingredient);      
    //   console.log(ingredient);
    // });
    
    //this.slService.addIngredients(this.recipe.ingredients);
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.recipe.ingredients)
    )

  }

  onDeleteRecipe(){
    if (confirm("Are you sure to delete this recipe: "+this.recipe.name)) {
      this.store.dispatch(new RecipesActions.DeleteRecipe(this.selectedId));
      this.router.navigate(['/recipes']);
    }
  }

}
