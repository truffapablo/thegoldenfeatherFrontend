import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";


export const getLogsByReservationId = (reservationId) => {
    return async (dispatch) => {
        //dispatch(startLoadingLog());
        try {
            const resp = await fetchWithToken(`logs/${reservationId}`);
            const data = await resp.json();
            if (data.ok) {
                //dispatch(setLogs(data.logs));
                //dispatch(finishLoadingLog());
                return data.logs;
            }
            return null;
        } catch (error) {
            console.log("Error", error);
            //dispatch(finishLoadingLog());
            return false;
        }
    };
}


const startLoadingLog = () => ({
    type: types.logStartLoading,
});

const finishLoadingLog = () => ({
    type: types.logFinishLoading,
});

const setLogs = (logs) => ({
    type: types.logSet,
    payload: logs,
});