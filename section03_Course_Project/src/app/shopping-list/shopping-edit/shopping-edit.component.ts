import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @Output() addNewItemEvent = new EventEmitter<Ingredient>();
  @ViewChild("nameInput") nameInputRef : ElementRef;
  @ViewChild("amountInput") amountInputRef : ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  addIngredient(name: string, amount: number){
    const newIngredient: Ingredient = new Ingredient(name, amount);
    this.addNewItemEvent.emit(newIngredient);
    this.nameInputRef.nativeElement.value = "";
    this.amountInputRef.nativeElement.value = "";
  }

}
