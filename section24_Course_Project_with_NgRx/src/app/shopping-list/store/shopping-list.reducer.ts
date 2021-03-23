import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";
import  * as ShoppingListActions from "./shopping-list.action";


export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number,
}


const inititalState: State = {
    ingredients: [
        new Ingredient('Potato', 5),
        new Ingredient('Cheese', 1),
    ],
    editedIngredient: null,
    editedIngredientIndex: -1,
};

export function shoppingListReducer(
    state: State = inititalState, 
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
            //const  ingredient = state.ingredients[action.payload.index];
            const updateIngredient = {
                ...state.editedIngredient,
                ...action.payload
            };

            const updateIngredients = [...state.ingredients];
            updateIngredients[state.editedIngredientIndex] = updateIngredient;
            
            return {
                ...state,
                ingredients: updateIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1,

            }
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: 
                    state.ingredients.filter( (ig, igIndex) => {
                        return igIndex !== state.editedIngredientIndex
                    }),
                editedIngredient: null,
                editedIngredientIndex: -1,
                
            }   
        case ShoppingListActions.START_EDIT:            
            return {
                ...state,
                editedIngredient: {...state.ingredients[action.payload]},
                editedIngredientIndex: action.payload                
            }

        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            }
           
        
        default:
            return state;
    }
    
}