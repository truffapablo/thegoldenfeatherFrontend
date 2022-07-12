import { useDispatch } from "react-redux";
import { types } from "../types/types";
import socket from "./config";

export const listenSockets = (dispatch) => {

    /**
     * TRANSFER SOCKET
     */

    socket.on('transfer-created', payload => {
        dispatch({
            type: types.transferAdd,
            payload: payload
        });
        
    });
    
    socket.on('transfer-deleted', payload => {
        dispatch({
            type: types.transferDelete,
            payload: payload
        });
        
    });

    socket.on('transfer-updated', payload => {
        dispatch({
            type: types.transferUpdate,
            payload: payload
        });
        
    });

    socket.on('many-transfer-reservations-updated', payload => {
        dispatch({
            type: types.transferUpdateMany,
            payload: payload
        });
        
    });

    /**
     * TRANSFER RESERVATION
     */
     socket.on('transfer-reservation-created', payload => {
        dispatch({
            type: types.transferReservationAdd,
            payload: payload
        });
        
    });

     socket.on('transfer-reservation-updated', payload => {
        dispatch({
            type: types.transferReservationUpdate,
            payload: payload
        });
        
    });

     socket.on('transfer-reservation-canceled', payload => {
        dispatch({
            type: types.transferReservationCancel,
            payload: payload
        });
        
    });

     socket.on('transfer-reservation-completed', payload => {
        dispatch({
            type: types.transferReservationComplete,
            payload: payload
        });
        
    });

     socket.on('transfer-reservation-confirmed', payload => {
        dispatch({
            type: types.transferReservationConfirm,
            payload: payload
        });
        
    });


    /**
     * EVENT SOCKET
     */
     socket.on('event-created', payload => {
        dispatch({
            type: types.eventAdd,
            payload: payload
        });
        
    });
    
    socket.on('event-deleted', payload => {
        dispatch({
            type: types.eventDelete,
            payload: payload
        });
        
    });

    socket.on('event-updated', payload => {
        dispatch({
            type: types.eventUpdate,
            payload: payload
        });
        
    });

    socket.on('many-event-reservations-updated', payload => {
        dispatch({
            type: types.reservationUpdateMany,
            payload: payload
        });
        
    });


    /**
     * EVENT RESERVATION
     */

    socket.on('event-reservation-created', payload => {
        dispatch({
            type: types.reservationAdd,
            payload: payload
        });
        
    });

    socket.on('event-reservation-updated', payload => {
        dispatch({
            type: types.reservationUpdate,
            payload: payload
        });
        
    });

    socket.on('event-reservation-canceled', payload => {
        dispatch({
            type: types.reservationCancel,
            payload: payload
        });
        
    });

    socket.on('event-reservation-completed', payload => {
        dispatch({
            type: types.reservationComplete,
            payload: payload
        });
        
    });

    socket.on('event-reservation-confirmed', payload => {
        dispatch({
            type: types.reservationConfirm,
            payload: payload
        });
        
    });
    
    socket.on('event-reservation-removed', payload => {
        dispatch({
            type: types.reservationRemove,
            payload: payload
        });
        
    });

    /**
     * CUSTOM RESERVATION
     */


     socket.on('custom-reservation-created', payload => {
        dispatch({
            type: types.reservationAddCustom,
            payload: payload
        });
        
    });

    socket.on('custom-reservation-updated', payload => {
        dispatch({
            type: types.reservationUpdateCustom,
            payload: payload
        });
        
    });

    socket.on('custom-reservation-canceled', payload => {
        dispatch({
            type: types.reservationCancelCustom,
            payload: payload
        });
        
    });

    socket.on('custom-reservation-completed', payload => {
        dispatch({
            type: types.reservationCompleteCustom,
            payload: payload
        });
        
    });

    socket.on('custom-reservation-confirmed', payload => {
        dispatch({
            type: types.reservationCompleteCustom,
            payload: payload
        });
        
    });
    
    socket.on('custom-reservation-removed', payload => {
        dispatch({
            type: types.reservationRemoveCustom,
            payload: payload
        });
        
    });





}