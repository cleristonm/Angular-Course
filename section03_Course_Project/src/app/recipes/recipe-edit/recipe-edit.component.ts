import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipe : Recipe;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router ) { }

  ngOnInit(): void {
    this.route.params
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
    

    if (this.editMode){
      recipeName = this.recipe.name;
      recipeImagePath = this.recipe.imagePath;
      recipeDescription = this.recipe.description;
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath' : new FormControl(recipeImagePath),
      'description' : new FormControl(recipeDescription)
    });
  }

  onSubmit(){
    console.log(this.recipeForm)
  }

  onAddEditRecipe(name: string, description: string, imagePath: string){
    if (this.editMode){
      this.recipeService.editRecipe(this.id, name, description, imagePath);
    }else{
      this.recipeService.addRecipe(name, description, imagePath);
    }    
    this.router.navigate(['/recipes'], {relativeTo: this.route});

  }

}
