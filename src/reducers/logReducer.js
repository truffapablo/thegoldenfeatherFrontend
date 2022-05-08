import { types } from "../types/types";

const initialState = {
    list: [],
    loading: false,
}

export const logReducer = (state = initialState, action) => {
    
        switch (action.type) {
            case types.logStartLoading:
                return {
                    ...state,
                    loading: true,
                }

            case types.logFinishLoading:
                return {
                    ...state,
                    loading: false,
                }

            case types.logSet:
                return {
                    ...state,
                    list: action.payload,
                }
    
            default: return state;
        }
}