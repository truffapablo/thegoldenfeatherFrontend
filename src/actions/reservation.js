import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";


export const getReservations = () => {
    return async(dispatch) => {
        
        try {
            dispatch(reservationStartLoading());
            const resp = await fetchWithToken('reservations');
            const data = await resp.json();
            if (data.ok) {
                dispatch(setReservations(data.reservations));
                dispatch(reservationFinishLoading());
            }
        } catch (error) {
            console.log('Error',error);
            dispatch(reservationFinishLoading());
        }
        

    }   
}

export const startNewReservation = (reservation) => {

    return async (dispatch) => {

        try {
            const resp = await fetchWithToken('reservations', reservation, 'POST');
            const data = await resp.json();
            if (data.ok) {
                dispatch(addReservation(data.reservation));
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

export const cancelReservation = ({id}) => {
    return async (dispatch) => {

        try {
            const resp = await fetchWithToken(`reservations/${id}`, {}, 'DELETE');
            const data = await resp.json();
            if (data.ok) {
                dispatch(reservationcancel(data.reservation));
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

export const confirmReservation = ({id}) => {
    
    return async (dispatch) => {
        try {
            const resp = await fetchWithToken(`reservations/${id}/confirm`, {}, 'PATCH');
            const data = await resp.json();
            if (data.ok) {
                dispatch(reservationConfirm(data.reservation));
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

export const updateReservation = (id, reservation) => {
    return async (dispatch) => {
            try {
                const resp = await fetchWithToken(`reservations/${id}`, reservation, 'PUT');
                const data = await resp.json();
                if (data.ok) {
                    dispatch(reservationUpdate(data.reservation));
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





const addReservation = (reservation) => {
    return {
        type: types.reservationAdd,
        payload: reservation
    }
}


const setReservations = (reservations) => {
    return {
        type: types.reservationSet,
        payload: reservations
    }
}

export const reservationStartLoading = () => {
    return {
        type: types.reservationStartLoading,
    }
}

export const reservationFinishLoading = () => {
    return {
        type: types.reservationFinishLoading,
    }
}

const reservationcancel = (reservation) => {
    return {
        type: types.reservationCancel,
        payload: reservation
    }
}

const reservationUpdate = (reservation) => {
    return {
        type: types.reservationUpdate,
        payload: reservation
    }
}

const reservationConfirm = (reservation) => {
    return {
        type: types.reservationConfirm,
        payload: reservation
    }
}