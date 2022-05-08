import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";


export const getEvents = () => {

    return async(dispatch) => {
            
            try {
                dispatch(eventStartLoading());
                const resp = await fetchWithToken('events');
                const data = await resp.json();
                if (data.ok) {
                    dispatch(setEvents(data.events));
                    dispatch(eventFinishLoading());
                }
            } catch (error) {
                console.log('Error',error);
                dispatch(eventFinishLoading());
            }   
    }
}

export const setEventActive = (event) => {
    return (dispatch) => {
        dispatch(setActive(event));
    }
}


const setEvents = (events) => {
    return {
        type: types.eventSet,
        payload: events
    }
}


const eventStartLoading = () => {
    return {
        type: types.eventStartLoading,
    }
}

const eventFinishLoading = () => {
    return {
        type: types.eventFinishLoading,
    }
}

const setActive = (event) => {
    return {
        type: types.eventSetActive,
        payload: event
    }
}