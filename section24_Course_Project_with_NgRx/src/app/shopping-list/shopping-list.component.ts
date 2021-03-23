import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import * as fromShoppingList from './store/shopping-list.reducer' 
import * as ShoppingListActions from './store/shopping-list.action'
import { AppState } from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable< { ingredients: Ingredient[] } >;
  private subscription: Subscription;

  constructor(
    private loggingService: LoggingService,
    private store: Store<AppState>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
    // this.ingredients = this.shoppingListService.getIngredients();
    // this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
    //   (ingredientsChanged : Ingredient[]) => {
    //     this.ingredients = ingredientsChanged;        
    //   }
    // );
    this.loggingService.printLog("Hello from shopping-list.component.js")
  }
  // !! Good practice to destroy a subscription
  ngOnDestroy(){
    // this.subscription.unsubscribe();    
  }
  
  onEditItem(index: number){
    //this.shoppingListService.startedEditing.next(index);    
    this.store.dispatch(
      new ShoppingListActions.StartEdit(index)
    )
  }

}
