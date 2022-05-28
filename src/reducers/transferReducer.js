import { types } from "../types/types";

const initialState = {
    list: [],
    loading: false,
}

export const transferReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.transferReservationAdd:
            return {
                ...state,
                list: [...state.list, action.payload],
            }

        case types.transferReservationDelete:
            return {
                ...state,
                list: state.list.filter(item => item.id !== action.payload),
            }
        
        case types.transferReservationUpdate:
            return {
                ...state,
                list: state.list.map(transfer => transfer.id === action.payload.id ? action.payload : transfer)
            }
        
        case types.transferReservationCancel:
            return {
                ...state,
                list: state.list.map(transfer => transfer.id === action.payload.id ? action.payload : transfer),
            }

        case types.transferReservationConfirm:
            return {
                ...state,
                list: state.list.map(transfer => transfer.id === action.payload.id ? action.payload : transfer),
            }
        
        case types.transferReservationComplete:
            return {
                ...state,
                list: state.list.map(transfer => transfer.id === action.payload.id ? action.payload : transfer),
            }
        
        default:
            return state;
    }
}