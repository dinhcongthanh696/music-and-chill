import { ActionTypes } from "../Action/ActionTypes";
export default function userReducer(state = {} , action){
    switch(action.type){
        case ActionTypes.LOGIN : 
            return {
                ...state,
                currentUser : action.payload
            }
        case ActionTypes.LOGOUT : 
            return {
                ...state,
                currentUser : {}
            }
        default : 
        return state;
    }
}


