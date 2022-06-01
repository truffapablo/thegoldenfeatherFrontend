import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";

export const getTransferReservations = () => {
    return async (dispatch) => {

        try {
            dispatch(transferReservationStartLoading());
            const resp = await fetchWithToken('transfer-reservation');
            const data = await resp.json();
            if (data.ok) {
                dispatch(setTransferReservations(data.transfers));
                dispatch(transferReservationFinishLoading());
            }
        } catch (error) {
            console.log('Error',error);
            dispatch(transferReservationFinishLoading());
        }

    }   
}

export const createTransferReservation = (transfer) => {
    return async (dispatch) => {
        
        try {
            const resp = await fetchWithToken('transfer-reservation', transfer, 'POST');
            const data = await resp.json();
            if (data.ok) {
                dispatch(addTransferReservation(data.transfer));
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

const transferReservationStartLoading = () => {
    return {
        type: types.transferReservationStartLoading
    }
}

const transferReservationFinishLoading = () => {
    return {
        type: types.transferReservationFinishLoading
    }
}

const setTransferReservations = (transferReservations) => {
    return {
        type: types.transferReservationSet,
        payload: transferReservations
    }
}

const addTransferReservation = (transferReservation) => {
    return {
        type: types.transferReservationAdd,
        payload: transferReservation
    }
} 