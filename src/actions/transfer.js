import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";


export const getTransfers = () => {
    return async (dispatch) => {

        try {
            dispatch(transferStartLoading());
            const resp = await fetchWithToken('transfer');
            const data = await resp.json();
            if (data.ok) {
                dispatch(setTransfers(data.transfers));
                dispatch(transferFinishLoading());
            }
        } catch (error) {
            console.log('Error',error);
            dispatch(transferFinishLoading());
        }

    }   
}

export const createTransfer  = (transfer) => {
    return async (dispatch) => {

        try {
            const resp = await fetchWithToken('transfer', transfer, 'POST');
            const data = await resp.json();
            if (data.ok) {
                dispatch(addTransfer(data.transfer));
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

export const updateTransfer  = (id, transfer) => {
    return async (dispatch) => {

        try {
            const resp = await fetchWithToken(`transfer/${id}`, transfer, 'PUT');
            const data = await resp.json();
            if (data.ok) {
                dispatch(editTransfer(data.transfer));
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

const addTransfer = (transfer) => {
    return {
        type: types.transferAdd,
        payload: transfer
    }
}

const setTransfers = (transfers) => {
    return {
        type: types.transferSet,
        payload: transfers
    }
}

const transferStartLoading = () => {
    return {
        type: types.transferStartLoading
    }
}

const transferFinishLoading = () => {
    return {
        type: types.transferFinishLoading
    }
}

const editTransfer = (transfer) => {
    return {
        type: types.transferUpdate,
        payload: transfer
    }
}