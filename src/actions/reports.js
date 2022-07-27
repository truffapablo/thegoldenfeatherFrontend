import { fetchWithToken } from "../helpers/fetch";



export const getDailyReport = () => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithToken('reports');
            const data = await resp.json();
            return data;
        } catch (error) {
            console.log(error);
            return {
                ok:false,
                error
            }
        }
    }
}


export const getMonthReport = ({month}) => {
    return async (dispatch) => {
        try {
            const resp = await fetchWithToken('reports/month',{month}, 'POST');
            const data = await resp.json();
            return data;
        } catch (error) {
            console.log(error);
            return {
                ok:false,
                error
            }
        }
    }
}

