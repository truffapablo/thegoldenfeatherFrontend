import { fetchWithToken } from "../helpers/fetch";
import { searchData } from "../helpers/searchMultipleData";
import { types } from "../types/types";


export const navSearch = (param, arrayList = []) => {
    return async (dispatch) => {
        try {
            dispatch(startSearching());

            let data = await searchData(param, arrayList);
            if(data.length > 0) {
                dispatch(setSearch(data));
                dispatch(finsihSearching());
                return true;
            }else{
                dispatch(finsihSearching());
                return false;
            }
            
        } catch (error) {
           
            dispatch(finsihSearching());
            return false
        }
    }
}

export const advanceSearch = (filters) => {
    return async (dispatch) => {

        try {
            dispatch({type:types.reservationStartAdvanceSearch});
            const resp = await fetchWithToken('search-reservations/advanced', filters, 'POST');
            const data = await resp.json();
            return data;

        } catch (error) {
            console.log(error);
            dispatch(finsihSearching());
            return false;
        }


    }

}


const startSearching = () => {
    return {
        type: types.navBarStartSearching,
    }
}

const finsihSearching = () => {
    return {
        type: types.navBarFinishSearching,
    }
}

const setSearch = (dataSearch) => {
    return {
        type: types.navBarSetSearch,
        payload: dataSearch,
    }
}
