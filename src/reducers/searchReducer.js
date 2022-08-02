import { advanceSearch } from "../actions/search";
import { types } from "../types/types";

const initialState = {
    listSearch: [],
    advanceSearch:[],
    loading: false,
}

export const searchReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.searchStartLoading:
            return {
                ...state,
                loading: true,
            }

        case types.searchFinishLoading:
            return {
                ...state,
                loading: false,
            }
        
        case types.navBarSetSearch:
            return {
                ...state,
                list: action.payload,
            }
        
        case types.reservationStartAdvanceSearch:
            return {
                ...state,
                loading: true,
            }
        
        case types.reservationFinishAdvanceSearch:
            return {
                ...state,
                loading: false,
            }
        
        case types.reservationSetAdvanceSearch:
            return {
                ...state,
                advanceSearch: action.payload,
            }
        
        case types.reservationCleanSearch:
            return{
                ...state,
                advanceSearch:[]
            }
        
        case types.reservationSetByConfirmationNumber: 
        return {
            ...state,
            listSearch: [action.payload]
        }

        default: return state;
    }
}