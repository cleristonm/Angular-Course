import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  recipeSelected : boolean = false;

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.recipeSelected = this.route.snapshot.params.hasOwnProperty('id');    
  }


}
