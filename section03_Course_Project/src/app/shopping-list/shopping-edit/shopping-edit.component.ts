import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("sForm") shoppingform : NgForm;
  newIngredient : Ingredient;
  
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.newIngredient = new Ingredient('',null);
  }

  onSubmit(){
    // another approuch
    // const newIngredient = new Ingredient(this.shoppingform.form.value.name, 
    //   this.shoppingform.form.value.amount);
    this.slService.addIngredient(this.newIngredient);
    this.newIngredient = null;
  }

}
