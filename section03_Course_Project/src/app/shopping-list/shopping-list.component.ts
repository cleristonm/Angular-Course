import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private shoppingListService : ShoppingListService,
    private loggingService: LoggingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredientsChanged : Ingredient[]) => {
        this.ingredients = ingredientsChanged;        
      }
    );

    this.loggingService.printLog("Hello from shopping-list.component.js")
  }
  // !! Good practice to destroy a subscription
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  
  onEditItem(index: number){
    this.shoppingListService.startedEditing.next(index);    
  }

}
