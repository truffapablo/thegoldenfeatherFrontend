import { types } from "../types/types"

const initialState = {
    checking: true,
    users:[]
}

export const authReducer = (state = initialState, action )=>{

    switch(action.type) {
        case types.login:
            return {
                ...state,
                ...action.payload,
                checking: false,
            }
        
        case types.logout:
            return {
                checking: false,
            }
        
        case types.authFinishChecking:
            return {
                ...state,
                checking: false,
            }
        
        case types.register:
            return {
                ...state,
                users:[...state.users, action.payload]
            }

        case types.changeUserPassword:
            return {
                ...state,
                changePassword:action.payload
            }
        
        case types.setUsers:
            return {
                ...state,
                users:action.payload
            }        
        default: return state;
    }

}