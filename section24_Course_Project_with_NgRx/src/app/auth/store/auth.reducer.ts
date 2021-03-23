import { User } from "../user.model"

export interface State {
    user: User
}

const inititalState: State = {
    user: null
}

export function authReducer (state = inititalState, action){
    return state
}