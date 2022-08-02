import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { resetPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import { types } from '../../types/types';

export const ResetPassword = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {uid} = useSelector(state => state.auth);
    const [formValues, handleInputChange] = useForm({
        oldPassword:'',
        newPassword:'',
    });
    
    const {oldPassword , newPassword} = formValues;

    if(!uid) {
        return <Navigate to="/login"/>
    }


    const resetPasword = (e) => {
        
        e.preventDefault();
        dispatch(resetPassword(formValues)).then(response => {
            if(response.ok){
                
                Swal.fire({
                    title:'Contraseña actualizada',
                    text: 'La contraseña se ha actualizado correctamente',
                    confirmButtonText: 'Ok',
                    icon:'success',
                });

                dispatch({
                    type:types.changeUserPassword,
                    payload:response.changeUserPassword
                });

                navigate('/dashboard/panel');

            }else{
                Swal.fire({
                    title: 'Error',
                    text: `No se pudo actualizar la contraseña`,
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
            }
        });
    }

  return (
    <div className='container-fluid px-4 custom-view mt-5'>
        <h1>Blanqueo de contraseña</h1>
        <form onSubmit={resetPasword}>
        <div className="form-group col-md-6">
            <label htmlFor="oldPassword">Clave actual (temporal):</label>
            <input type="password" className="form-control" value={oldPassword} name="oldPassword" id="oldPassword" onChange={handleInputChange}/>
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="newPassword">Nueva clave:</label>
            <input type="password" className="form-control" value={newPassword} name="newPassword" id="newPassword" onChange={handleInputChange}/>
        </div>
        <button type="submit" className="btn btn-primary btn-reserve mt-2">Actualizar clave</button>
        </form>
    </div>
  )
}
