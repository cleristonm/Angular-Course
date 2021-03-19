import { Action } from "@ngrx/store";
import { Ingredient } from "../shared/ingredient.model";

const inititalState = {
    ingredients: [
        new Ingredient('Potato', 5),
        new Ingredient('Cheese', 1),
    ]
};

export function shoppingListReducer(state = inititalState, action: Action){
    switch (action.type){
        case 'ADD_INGREDIENT':
            return {
                ...state,
                ingredient: [
                    ...state.ingredients,
                    action                    
                ]
            }
    }
    
}