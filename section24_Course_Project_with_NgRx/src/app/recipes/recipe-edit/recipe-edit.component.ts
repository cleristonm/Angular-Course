import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipes/recipe.model';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipe : Recipe;
  recipeForm: FormGroup;
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private store: Store<fromApp.AppState> ) { }

  ngOnInit(): void {
    this.subscription = this.route.params
      .subscribe(
        (params : Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;

          if (this.editMode){
            this.recipe = this.recipeService.getRecipe(this.id);            
          }

          this.initForm();
        }

      )
  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);    

    if (this.editMode){
      this.store.select('recipes').pipe(map(recipeState => {
          return recipeState.recipes.find( (recipe, index) => {
            return index === this.id;
          })
        })).subscribe(recipe => {         
          this.recipe = recipe; 
          recipeName = this.recipe.name;
          recipeImagePath = this.recipe.imagePath;
          recipeDescription = this.recipe.description;
    
          if (this.recipe['ingredients']){
            for (let ingredient of this.recipe.ingredients){
              recipeIngredients.push(
                new FormGroup({
                  'name': new FormControl(ingredient.name, Validators.required),
                  'amount': new FormControl(ingredient.amount, [
                      Validators.required, 
                      Validators.pattern(/^[1-9]+[0-9]*$/)])
                })
              )
            }
          }
        })      
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath' : new FormControl(recipeImagePath, Validators.required),
      'description' : new FormControl(recipeDescription,Validators.required),
      'ingredients': recipeIngredients
    });
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push( new FormGroup({
      
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required, 
          Validators.pattern(/^[1-9]+[0-9]*$/)]),
      
    }))
  }

  onSubmit(){
    // const recipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // );
    if (this.editMode){
      this.recipeService.editRecipe(this.id, this.recipeForm.value);
    }else {      
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
    
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  // onAddEditRecipe(name: string, description: string, imagePath: string){
  //   if (this.editMode){
  //     this.recipeService.editRecipe(this.id, name, description, imagePath);
  //   }else{
  //     this.recipeService.addRecipe(name, description, imagePath);
  //   }    
  //   this.router.navigate(['/recipes'], {relativeTo: this.route});

  // }

  ngOnDestroy(){
    // this.subscription.unsubscribe();
  }

  removeIngredient(id:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(id);
  }
}
