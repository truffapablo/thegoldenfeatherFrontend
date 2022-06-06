import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";

export const getTransferReservations = () => {
    return async (dispatch) => {

        try {
            dispatch(transferReservationStartLoading());
            const resp = await fetchWithToken('transfer-reservation');
            const data = await resp.json();
            if (data.ok) {
                dispatch(setTransferReservations(data.transferR));
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
                dispatch(addTransferReservation(data.transferR));
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

export const editTransferReservation = (id, transfer) => {
    return async (dispatch) => {
        
        try {
            const resp = await fetchWithToken(`transfer-reservation/${id}`, transfer, 'PUT');
            const data = await resp.json();
            if (data.ok) {
                dispatch(transferReservationEdit(data.transferR));
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

export const cancelTransferReservation = (id) => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithToken(`transfer-reservation/${id}`, {}, 'DELETE');
            const data = await resp.json();
            if (data.ok) {
                dispatch(transferReservationCancel(data.transferR));
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


export const confirmTransferReservation = (id) => {

    return async (dispatch) => {
        try {
            const resp = await fetchWithToken(`transfer-reservation/${id}/confirm`, {}, 'PATCH');
            const data = await resp.json();
            if (data.ok) {
                dispatch(transferReservationConfirm(data.transferR));
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

export const completeTransferReservation = (id) => {

    return async (dispatch) => {
        try {
            const resp = await fetchWithToken(`transfer-reservation/${id}/complete`, {}, 'PATCH');
            const data = await resp.json();
            if (data.ok) {
                dispatch(transferReservationComplete(data.transferR));
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

const transferReservationCancel = (transferReservation) => {
    return {
        type: types.transferReservationCancel,
        payload: transferReservation
    }
}

const transferReservationConfirm = (transferReservation) => {
    return {
        type: types.transferReservationConfirm,
        payload: transferReservation
    }
}

const transferReservationComplete = (transferReservation) => {
    return {
        type: types.transferReservationComplete,
        payload: transferReservation
    }
}


const transferReservationEdit = (transferReservation) => {
    return {
        type: types.transferReservationUpdate,
        payload: transferReservation
    }
}


