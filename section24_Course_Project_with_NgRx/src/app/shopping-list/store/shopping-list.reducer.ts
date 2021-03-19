import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import  * as ShoppingListActions from "./shopping-list.action";

const inititalState = {
    ingredients: [
        new Ingredient('Potato', 5),
        new Ingredient('Cheese', 1),
    ]
};

export function shoppingListReducer(
    state = inititalState, 
    action: ShoppingListActions.AddIngredient){

    switch (action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    action.payload                    
                ]
            }
            
            
        default:
            return state;
    }
    
}