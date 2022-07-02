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

        case types.eventAdd:
            return {
                ...state,
                list: [...state.list, action.payload],
            }

        case types.eventUpdate:
            return {
                ...state,
                list: state.list.map(event => event.id === action.payload.id ? action.payload : event),
            }
        
        case types.eventDelete:
            return {
                ...state,
                list: state.list.filter(event => event.id !== action.payload),
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

