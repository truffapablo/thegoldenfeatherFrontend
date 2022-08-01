import { fetchWithToken } from "../helpers/fetch";



export const getDailyReport = (user) => {
    return async (dispatch) => {
        try {
            let resp;
            if(!user){
                resp = await fetchWithToken('reports');
            }else{
                resp = await fetchWithToken(`reports?uid=${user}`);
            }
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


export const getMonthReport = ({month,year}, user) => {
    return async (dispatch) => {
        try {
            let resp;
            if(!user){
                resp = await fetchWithToken('reports/month',{month,year}, 'POST');
            }else{
                resp = await fetchWithToken(`reports/month?uid=${user}`,{month,year}, 'POST');
            }
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

export const getReportByDate = (date, user) => {
    
    return async (dispatch) => {
        try {
            let resp;
            if(!user){
                resp = await fetchWithToken('reports/date',date, 'POST');
            }else{
                resp = await fetchWithToken(`reports/date?uid=${user}`,date, 'POST');
            }
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

