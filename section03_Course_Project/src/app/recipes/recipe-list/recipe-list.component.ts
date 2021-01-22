import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('Poutine', 'This is simple', 'https://www.seriouseats.com/recipes/images/2015/03/20150327-poutine-joshua-bousel.jpg'),
    new Recipe('Feijoada', 'So delicious', 'https://i0.statig.com.br/bancodeimagens/2m/x8/6n/2mx86nv7kxv8cybegti6zvw0t.jpg')
  ];
  @Output() onSelectRecipe = new EventEmitter<Recipe>();
  constructor() { }

  ngOnInit(): void {

  }

  selectRecipe(recipe: Recipe){    
    this.onSelectRecipe.emit(recipe);        
  }

}
