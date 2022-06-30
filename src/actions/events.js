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


export const createEvent = (event) => {

    return async(dispatch) => {
        try {
            const resp = await fetchWithToken('events', event, 'POST');
            const data = await resp.json();
            if (data.ok) {
                dispatch(addEvent(data.event));
                return true
            }
        } catch (error) {
            console.log('Error',error);
            return false
        }   
    }

}

export const updateEvent = (id, event) => {
        
        return async(dispatch) => {
            try {
                const resp = await fetchWithToken(`events/${id}`, event, 'PUT');
                const data = await resp.json();
                if (data.ok) {
                    dispatch(editEvent(data.event));
                    return true
                }
            } catch (error) {
                console.log('Error',error);
                return false
            }   
        }
    
}

export const deleteEvent = (id) => {
    
    return async(dispatch) => {
        try {
            const resp = await fetchWithToken(`events/${id}`, {}, 'DELETE');
            const data = await resp.json();
            if (data.ok) {
                
                dispatch(removeEvent(id));
                if(data.reservationsCanceled.length > 0){
                    
                    dispatch({
                        type: types.reservationUpdateMany,
                        payload: data.reservationsCanceled
                    });
                }
                return true
            }else{
                return false
            }
        } catch (error) {
            console.log('Error',error);
            return false
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

const addEvent = (event) => {
    return {
        type: types.eventAdd,
        payload: event
    }
}

const editEvent = (event) => {
    return {
        type: types.eventUpdate,
        payload: event
    }
}

const removeEvent = (id) => {
    return {
        type: types.eventDelete,
        payload: id
    }
}