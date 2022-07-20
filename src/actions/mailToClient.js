import { fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";


export const mailToClient = async (reservation) => {

        try {
            const resp = await fetchWithToken('mail-client', reservation, 'POST');
            const data = await resp.json();
            
            return data;
            
        } catch (error) {
            return false
        }
    
}