import { types } from "../types/types";

const initialState = {
    list: [],
    customList:[],
    transferList: [],
    active: null,
    loading: true,
}

export const reservationReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.reservationStartLoading:
            return{
                ...state,
                loading: true,
            }
        case types.reservationFinishLoading:
            return{
                ...state,
                loading: false,
            }
        case types.reservationAdd:
            return{
                ...state,
                list: [...state.list, action.payload],
            }

        case types.reservationAddFuture:
            return{
                ...state,
                loading: false,
            }

        case types.reservationAddCustom:
            return{
                ...state,
                customList: [...state.customList, action.payload],
            }

        case types.reservationSet:
            return{
                ...state,
                list: action.payload,
            }
        
        case types.reservationSetCustom:
            return{
                ...state,
                customList: action.payload,
            }
        
        case types.reservationClean:
            return {
                ...state,
                list: [],
                active: null
            }
        
        case types.reservationCancel:
            return {
                ...state,
                list: state.list.map(reservation => reservation.id === action.payload.id ? action.payload : reservation),
            }
        

        case types.reservationCancelCustom:
            return {
                ...state,
                customList: state.customList.map(reservation => reservation.id === action.payload.id ? action.payload : reservation),
            }
        
        case types.reservationUpdate:
            return {
                ...state,
                list: state.list.map(reservation => reservation.id === action.payload.id ? action.payload : reservation),
            }
        
        case types.reservationUpdateMany:
            return {
                ...state,
                list: state.list.map(reservation => action.payload.find(reservationUpdate => reservationUpdate.id === reservation.id) ? action.payload.find(reservationUpdate => reservationUpdate.id === reservation.id) : reservation),
            }

        case types.reservationUpdateCustom:
            return {
            ...state,
            customList: state.customList.map(reservation => reservation.id === action.payload.id ? action.payload : reservation),
        }

        case types.reservationConfirm:
            return {
                ...state,
                list: state.list.map(reservation => reservation.id === action.payload.id ? action.payload : reservation),
        }

        case types.reservationConfirmCustom:
            return {
            ...state,
            customList: state.customList.map(reservation => reservation.id === action.payload.id ? action.payload : reservation),
        }

        case types.reservationComplete:
            return {
                ...state,
                list: state.list.map(reservation => reservation.id === action.payload.id ? action.payload : reservation),
        }

        case types.reservationCompleteCustom:
            return {
            ...state,
            customList: state.customList.map(reservation => reservation.id === action.payload.id ? action.payload : reservation),
        }

        case types.transferReservationSet:
            return {
                ...state,
                transferList: action.payload,
            }

        case types.transferReservationFinishLoading:
            return {
                ...state,
                loading: false,
            }

        case types.transferReservationStartLoading:
            return {
                ...state,
                loading: true,
            }

        case types.transferReservationAdd:
            return {
                ...state,
                transferList: [...state.transferList, action.payload],
            }
        
        case types.transferReservationCancel:
            return {
                ...state,
                transferList: state.transferList.map(reservation => reservation.id === action.payload.id ? action.payload : reservation),
            }

        case types.transferReservationConfirm:
            return {
                ...state,
                transferList: state.transferList.map(reservation => reservation.id === action.payload.id ? action.payload : reservation),
            }

        case types.transferReservationComplete:
            return {
                ...state,
                transferList: state.transferList.map(reservation => reservation.id === action.payload.id ? action.payload : reservation),
            }

        case types.transferReservationUpdate:
            return {
                ...state,
                transferList: state.transferList.map(reservation => reservation.id === action.payload.id ? action.payload : reservation),
            }

        case types.transferUpdateMany:
            return {
                ...state,
                transferList: state.transferList.map(reservation => action.payload.find(reservationUpdate => reservationUpdate.id === reservation.id) ? action.payload.find(reservationUpdate => reservationUpdate.id === reservation.id) : reservation),
            }
        
    
        default:return state;
    }
}