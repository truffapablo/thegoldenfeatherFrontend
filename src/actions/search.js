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
            console.log(error);
        }
    }
}

export const advanceSearch = (filters) => {
    return async (dispatch) => {

        try {
            
            const resp = await fetchWithToken('search-reservations/advanced', filters, 'POST');
            const data = await resp.json();
            if (data.ok) {
                console.log(data);
                return true;
            }else{
                console.log(data);
                return false;
            }

        } catch (error) {
            console.log(error);
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
