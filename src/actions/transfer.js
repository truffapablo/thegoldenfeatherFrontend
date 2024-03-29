import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";
import socket from '../sockets/config';


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

                socket.emit('new-transfer', data.transfer, serverCallback =>{
                    console.log(serverCallback);
                });

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
                socket.emit('update-transfer', data.transfer, serverCallback =>{
                    console.log(serverCallback);
                });
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

export const deleteTransfer = (id) => {
    return async (dispatch) => {
        try {
            
            const resp = await fetchWithToken(`transfer/${id}`, {}, 'DELETE');
            const data = await resp.json();
            if (data.ok) {
                dispatch(transferDelete(id));

                socket.emit('delete-transfer', id, serverCallback =>{
                    console.log(serverCallback);
                });
                
                if(data.transferReservationsCanceled.length > 0){
                    dispatch({
                        type: types.transferUpdateMany,
                        payload: data.transferReservationsCanceled
                    });

                    socket.emit('update-many-transfer-reservations', data.transferReservationsCanceled, serverCallback =>{
                        console.log(serverCallback);
                    });


                }
                
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


const transferDelete = (id) => {
    return {
        type: types.transferDelete,
        payload: id
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