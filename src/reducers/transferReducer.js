import { types } from "../types/types";

const initialState = {
    list: [],
    loading: false,
}

export const transferReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.transferStartLoading:
            return {
                ...state,
                loading: true,
            }

        case types.transferFinishLoading:
            return {
                ...state,
                loading: false,
            }

        case types.transferSet:
            return {
                ...state,
                list: action.payload,
            }

        case types.transferAdd:
            return {
                ...state,
                list: [...state.list, action.payload],
            }

        case types.transferDelete:
            return {
                ...state,
                list: state.list.filter(item => item.id !== action.payload),
            }
        
        case types.transferUpdate:
            return {
                ...state,
                list: state.list.map(transfer => transfer.id === action.payload.id ? action.payload : transfer)
            }
        
        case types.transferCancel:
            return {
                ...state,
                list: state.list.map(transfer => transfer.id === action.payload.id ? action.payload : transfer),
            }

        case types.transferConfirm:
            return {
                ...state,
                list: state.list.map(transfer => transfer.id === action.payload.id ? action.payload : transfer),
            }
        
        case types.transferComplete:
            return {
                ...state,
                list: state.list.map(transfer => transfer.id === action.payload.id ? action.payload : transfer),
            }
        
        default:
            return state;
    }
}