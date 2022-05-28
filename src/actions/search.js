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
