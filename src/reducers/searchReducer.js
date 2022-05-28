import { types } from "../types/types";

const initialState = {
    list: [],
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
        
        default: return state;
    }
}