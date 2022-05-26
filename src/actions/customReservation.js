import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import { reservationFinishLoading, reservationStartLoading } from "./reservation";



export const startCustomReservation = (reservation) => {

    return async (dispatch) => {

        try {
            const resp = await fetchWithToken('custom-reservations', reservation, 'POST');
            const data = await resp.json();
            if (data.ok) {
                console.log('data',data);
                dispatch(addCustomReservation(data.reservation));
                return true;

            }else{
                return false;
            }
        } catch (error) {
            console.log('Error',error);
            return false;
        }
    }
}

export const getCustomReservations = () => {
    return async(dispatch) => {
        
        try {
            dispatch(reservationStartLoading());
            const resp = await fetchWithToken('custom-reservations');
            const data = await resp.json();
            if (data.ok) {
                dispatch(setCustomReservations(data.reservations));
                dispatch(reservationFinishLoading());
            }
        } catch (error) {
            console.log('Error',error);
            dispatch(reservationFinishLoading());
        }
        

    }   
}

export const updateCustomReservation = (id, reservation) => {
    return async (dispatch) => {
            try {
                const resp = await fetchWithToken(`custom-reservations/${id}`, reservation, 'PUT');
                const data = await resp.json();
                console.log(data);
                if (data.ok) {
                    dispatch(reservationCustomUpdate(data.reservation));
                    return true;
                }else{
                  return false;
                  
                }
            } catch (error) {
                console.log('Error',error);
                return false;
            }
    }
}

export const cancelCustomReservation = ({id}) => {
    return async (dispatch) => {

        try {
            const resp = await fetchWithToken(`custom-reservations/${id}`, {}, 'DELETE');
            const data = await resp.json();
            if (data.ok) {
                console.log('data',data);
                dispatch(reservationCancelCustom(data.reservation));
                return true;
            }else{
                return false;
            }
        } catch (error) {
            console.log('Error',error);
            return false;
        }
    }
}

export const confirmCustomReservation = ({id}) => {
    
    return async (dispatch) => {
        try {
            const resp = await fetchWithToken(`custom-reservations/${id}/confirm`, {}, 'PATCH');
            const data = await resp.json();
            if (data.ok) {
                dispatch(reservationCustomConfirm(data.reservation));
                return true;
            }else{
                return false;
            }
        } catch (error) {
            console.log('Error',error);
            return false;
        }
    }
}

export const completeCustomReservation = ({id}) => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithToken(`custom-reservations/${id}/complete`, {}, 'PATCH');
            const data = await resp.json();
            if (data.ok) {
                dispatch(reservationCustomComplete(data.reservation));
                return true;
            }else{
                return false;
            }
        } catch (error) {
            console.log('Error',error);
            return false;
        }
    }
}


const addCustomReservation = (reservation) => {
    return {
        type: types.reservationAddCustom,
        payload: reservation
    }
}

const setCustomReservations = (reservations) => {
    return {
        type: types.reservationSetCustom,
        payload: reservations
    }
}

const reservationCancelCustom = (reservation) => {
    return {
        type: types.reservationCancelCustom,
        payload: reservation
    }
}

const reservationCustomUpdate  = (reservation) => {
    return {
        type: types.reservationUpdateCustom,
        payload: reservation
    }
}

const reservationCustomConfirm = (reservation) => {
    return {
        type: types.reservationConfirmCustom,
        payload: reservation
    }
}

const reservationCustomComplete = (reservation) => {
    return {
        type: types.reservationCompleteCustom,
        payload: reservation
    }
}