import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  
  @ViewChild("nameInput") nameInputRef : ElementRef;
  @ViewChild("amountInput") amountInputRef : ElementRef;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
  }

  addIngredient(name: string, amount: number){
    const newIngredient: Ingredient = new Ingredient(name, amount);    
    this.nameInputRef.nativeElement.value = "";
    this.amountInputRef.nativeElement.value = "";
    this.slService.addIngredients(newIngredient);
  }

}
