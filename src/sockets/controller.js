import { useDispatch } from "react-redux";
import { types } from "../types/types";
import socket from "./config";

export const listenSockets = (dispatch) => {


    console.log('Escuchando sockets...');
    
    socket.on('new-transfer', payload =>{
        socket.broadcast.emit('new-transfer', payload);
    });

    socket.on('transfer-created', payload => {
        console.log(payload);
        dispatch({
            type: types.transferAdd,
            payload: payload
        });
        
    })



}