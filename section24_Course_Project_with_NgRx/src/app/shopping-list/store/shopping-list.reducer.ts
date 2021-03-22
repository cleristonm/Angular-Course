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
    action: ShoppingListActions.ShoppingListActions){

    switch (action.type){
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    action.payload                    
                ]
            }
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    ...action.payload                    
                ]
            }
        case ShoppingListActions.UPDATE_INGREDIENT:
            const  ingredient = state.ingredients[action.payload.index];
            const updateIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            };

            const updateIngredients = [...state.ingredients];
            updateIngredients[action.payload.index] = updateIngredient;
            
            return {
                ...state,
                ingredients: updateIngredients
            }
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: 
                    state.ingredients.filter( (ig, igIndex) => {
                        return igIndex !== action.payload.index
                    }) 
                
            }       
            
        default:
            return state;
    }
    
}