import { types } from "../types/types";

const initialState = {
    list:[]
}

export const notificationReducer = (state = initialState, action) => {
    
    switch (action.type) {
        case types.notificationAdd:
            return {
                ...state,
                list: [...state.list, action.payload],
            }
        
        case types.notificationRemove:
            return {
                ...state,
                list: state.list.filter(notification => notification.id !== action.payload)
            }

        case types.notificationClearAll:
            return {
                ...state,
                list: []
            }
    
        default:
            return state;
    }
}
