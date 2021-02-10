import { Component, OnInit } from '@angular/core';
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
        }

      )
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