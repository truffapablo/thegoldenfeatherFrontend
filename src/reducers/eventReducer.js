import { types } from "../types/types";

const initialState = {
    list: [],
    active: null,
    loading: true,
}


export const eventReducer = (state = initialState, action) => {

    switch ( action.type ) {
        case types.eventSet:
            return {
                ...state,
                list: action.payload,
            }
        case types.eventStartLoading:
            return {
                ...state,
                loading: true,
            }
        
        case types.eventFinishLoading:
            return {
                ...state,
                loading: false,
            }
        
        case types.eventSetActive:
            return {
                ...state,
                active: action.payload,
            }


        default: return state;
    }
}

