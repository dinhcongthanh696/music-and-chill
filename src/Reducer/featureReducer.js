import { NAVBARS } from "../Components/Constants";
import { ActionTypes } from "../Action/ActionTypes";

const defaultFeatureState = {
    navbars : NAVBARS,
    currentNavIndex : 0
 }
export default function featureReducer(state = defaultFeatureState, action){
    switch(action.type){
        case ActionTypes.NAVIGATING :
            return {
                ...state,
                currentNavIndex : action.payload.index
            }
        case ActionTypes.RESET_FEATURE_STATE : 
            return defaultFeatureState;    
        default : return state;    
    }
}