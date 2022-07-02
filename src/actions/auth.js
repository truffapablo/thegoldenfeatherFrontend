
import Swal from 'sweetalert2';
import { fetchWithOutToken, fetchWithToken } from '../helpers/fetch';
import { types } from "../types/types";


export const startLogin = (email, password) => {


    return async (dispatch) => {
        
        try {
            const resp = await fetchWithOutToken('auth', { email, password }, 'POST');
            const data = await resp.json();
            if (data.ok) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('token-init-date', new Date().getTime());
                dispatch(login({
                    uid: data.uid,
                    name: data.name,
                    email: data.email,
                    changePassword: data.changePassword,
                    role: data.role,
                }));

                document.cookie = `token=${data.token}`;

            } else {
                Swal.fire({
                    title: 'Error',
                    text: data.msg,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
            
        } catch (error) {
            console.log('Error',error);
        }

    }
}

export const startChecking = () => {


    return async (dispatch) => {
        try {

            if(localStorage.getItem('token') && localStorage.getItem('token-init-date')){
                const resp = await fetchWithToken('auth/renew');
                const data = await resp.json();
                if (data.ok) {
                    dispatch(login({
                        uid: data.uid,
                        name: data.name,
                        email:data.email,
                        changePassword:data.changePassword,
                        role: data.role
                    }));
                }else{
                    dispatch(checkingFinish());
                }

            }

            dispatch(checkingFinish());

        } catch (error) {
            console.log('Error',error);
            return false
        }
    }
}


export const startRegister = (user) =>{
    return async(dispatch) => {
        try {
            const resp = await fetchWithToken('auth/new', user, 'POST' );
            const data = await resp.json();
            if(data.ok){
                dispatch({
                    type:types.register,
                    payload:data.user
                })
            }
            return data;
        } catch (error) {
            console.log('Error',error);
            return false
        }
    }
}

export const resetPassword = (userCredentials) => {
    return async(dispatch) => {
        try {
            const resp = await fetchWithToken('auth/reset-password', userCredentials, 'PUT');
            const data = await resp.json();
            return data;
        } catch (error) {
            console.log('Error',error);
            return false
        }
    }
}




export const logout = () => {
    return async (dispatch) => {
        try {
            localStorage.clear();
            dispatch(logoutUser());
            return true
        } catch (error) {
            console.log(error);
        }
    }
}


const logoutUser = () => {
    return {
        type: types.logout,
    }
}

const login = (user)=>{
    return {
        type: types.login,
        payload: user
    }
}

const checkingFinish = () => {
    return {
        type: types.authFinishChecking,
    }
}





