import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import * as ShoppingListActions from '../store/shopping-list.action';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {  
  @ViewChild('sForm') slForm: NgForm;
  @ViewChild('nameRef') nameRef: ElementRef;
  newIngredient : Ingredient;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem : Ingredient;
  
  constructor(
    private slService: ShoppingListService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) { }

  ngOnInit(): void {
    this.newIngredient = new Ingredient('',null);
    this.subscription =  this.slService.startedEditing
      .subscribe(
          (index: number) => {

            this.editMode = true;
            this.editedItemIndex = index;
            this.newIngredient = {...this.slService.getIngredient(index)};    
            console.log(this.newIngredient);
                    
            // this.slForm.setValue({
            //   name: this.editedItem.name,
            //   amount: this.editedItem.amount
            // })
    })
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  onSubmit(shoppingform: NgForm){
    // another approuch
    // const newIngredient = new Ingredient(hoppingform.form.value.name, 
    //   shoppingform.form.value.amount);    
        
    if (!this.editMode){
      // this.slService.addIngredient(this.newIngredient);
      this.store.dispatch(
        new ShoppingListActions.AddIngredient(this.newIngredient)
      )
    }else{
      //this.slService.updateIngredient(this.editedItemIndex, this.newIngredient);

      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient({
          index: this.editedItemIndex, 
          ingredient: this.newIngredient})
      );
    }
    this.newIngredient =  new Ingredient('',null);    
    this.nameRef.nativeElement.focus();    
    shoppingform.reset();    
    this.editMode = false;
  }

  onClear(shoppingform: NgForm){
    shoppingform.reset();    
    this.editMode = false;
  }

  onDelete(shoppingform: NgForm){
    //this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(
      new ShoppingListActions.DeleteIngredient({
        index: this.editedItemIndex})
    );
    this.onClear(shoppingform);
  }
}
