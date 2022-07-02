import { fetchWithToken } from "../helpers/fetch"
import { types } from "../types/types";


export const getUsers = () => {

    return async (dispatch) => {
        try {
            const resp = await fetchWithToken('auth/users');
            const data = await resp.json();
            if(data.ok) {
                dispatch({
                    type: types.setUsers,
                    payload:data.users
                });
            }
            return data;
        } catch (error) {
            console.log(error);
            return false
        }

    }

}
