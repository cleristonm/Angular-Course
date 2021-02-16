import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {  
  @ViewChild('nameRef') nameRef: ElementRef;
  newIngredient : Ingredient;
  
  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.newIngredient = new Ingredient('',null);
  }

  onSubmit(shoppingform: NgForm){
    // another approuch
    // const newIngredient = new Ingredient(hoppingform.form.value.name, 
    //   shoppingform.form.value.amount);    

    this.slService.addIngredient(this.newIngredient);
    this.newIngredient =  new Ingredient('',null);    
    this.nameRef.nativeElement.focus();    
    shoppingform.reset();    
  }

}
