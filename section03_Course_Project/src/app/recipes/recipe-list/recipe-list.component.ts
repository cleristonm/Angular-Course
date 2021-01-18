import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A test recipe', 'This is simple', 'https://www.seriouseats.com/recipes/images/2015/03/20150327-poutine-joshua-bousel.jpg')
  ];
  constructor() { }

  ngOnInit(): void {

  }

}
