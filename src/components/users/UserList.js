import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import { createTemporaryPassword, denyUserAccess, forceUserChangePassword, grantUserAccess } from '../../actions/auth';
import { getUsers } from '../../actions/user';
import { useForm } from '../../hooks/useForm';
import { RegisteredUsers } from '../register/RegisteredUsers';

export const UserList = () => {

 const {users} = useSelector(state => state.auth);
 const dispatch = useDispatch();
 const location = useLocation();
 
 const [selectedId, setSelectedId] = useState(false);
 const [selected, setSelected] = useState(false);

 const [changePassword, setChangePassword] = useState(false);

 const [formValues, handleInputChange, reset] = useForm({
    password:''
 });

 const {password} = formValues;

 useEffect(()=>{
    setChangePassword(false);
 },[location])

 useEffect(()=>{
    if(!selectedId){
        setSelected(users[0])
    }else{
        let user = users.find(user => user._id === selectedId)
        setSelected(user);

    }
 },[selectedId, users])

 if(!selected || selected.length === 0 ) {
    <Navigate to='/'/>
    return null
 }

 
 


 const grantAccess = (id) => {
    
    Swal.fire({
        title: '¿Estás seguro?',
        html: `Estas por conceder acceso a <strong>${selected.email}</strong>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#263032',
        cancelButtonColor: '#C59B5F',
        confirmButtonText: 'Sí, dar acceso!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {

            dispatch(grantUserAccess(id)).then(rta => {
                if(rta.ok){
                    dispatch(getUsers());
                    Swal.fire({
                        title: 'Acceso concedido',
                        html: `El usuario <strong>${selected.email}</strong> ya tiene acceso al sistema.`,
                        icon: 'success',
                        confirmButtonColor: '#263032',
                    });
                }else{
                    Swal.fire({
                        title: 'Error',
                        html: `No se pudo conceder el acceso.`,
                        icon: 'error',
                        confirmButtonColor: '#263032',
                    });

                }
            });
            
        }
      });
    
    
 }
 const denyAccess = (id) => {
    Swal.fire({
        title: '¿Estás seguro?',
        html: `Estas por denegar acceso al sistema a <strong>${selected.email}</strong>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#263032',
        cancelButtonColor: '#C59B5F',
        confirmButtonText: 'Sí, denegar acceso!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {

            dispatch(denyUserAccess(id)).then(rta => {
                if(rta.ok){
                    dispatch(getUsers());
                    Swal.fire({
                        title: 'Acceso denegado',
                        html: `El usuario <strong>${selected.email}</strong> ya no tiene acceso al sistema.`,
                        icon: 'success',
                        confirmButtonColor: '#263032',
                    });
                }else{
                    Swal.fire({
                        title: 'Error',
                        html: `No se pudo denegar el acceso.`,
                        icon: 'error',
                        confirmButtonColor: '#263032',
                    });

                }
            });
            
        }
      });
 }
 const whitelistPassword = (id) => {
    Swal.fire({
        title: '¿Estás seguro?',
        html: `Estas por forzar un blanqueo de contraseña a <strong>${selected.email}.</strong> <br/> Esta acción hará que el usuario tenga que cambiar su contraseña actual.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#263032',
        cancelButtonColor: '#C59B5F',
        confirmButtonText: 'Sí, blanquear contraseña!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {

            dispatch(forceUserChangePassword(id)).then(rta => {
                if(rta.ok){
                    dispatch(getUsers());
                    Swal.fire({
                        title: 'Blanqueo',
                        html: `El usuario <strong>${selected.email}</strong> deberá actualizar su contraseña.`,
                        icon: 'success',
                        confirmButtonColor: '#263032',
                    });
                }else{
                    Swal.fire({
                        title: 'Error',
                        html: `No se pudo forzar el blanqueo de contraseña.`,
                        icon: 'error',
                        confirmButtonColor: '#263032',
                    });

                }
            });
            
        }
      });
}

const handleSubmit = (e) =>{
    e.preventDefault();
    Swal.fire({
        title: '¿Estás seguro?',
        html: `Estas por cambiar la contraseña de <strong>${selected.email}.</strong> <br/> Esta acción hará que el usuario tenga que ingresar con la contraseña temporal.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#263032',
        cancelButtonColor: '#C59B5F',
        confirmButtonText: 'Sí, generar contraseña!',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.value) {

            dispatch(createTemporaryPassword(selectedId, password)).then(rta => {
                if(rta.ok){
                    dispatch(getUsers());
                    Swal.fire({
                        title: 'Contraseña Temporal',
                        html: `El usuario <strong>${selected.email}</strong> deberá ingresar con la contraseña temporal generada.`,
                        icon: 'success',
                        confirmButtonColor: '#263032',
                    });
                }else{
                    Swal.fire({
                        title: 'Error',
                        html: `No se pudo crear la contraseña temporal.`,
                        icon: 'error',
                        confirmButtonColor: '#263032',
                    });

                }
                setChangePassword(false);
            });
            
        }
      });

}

  return (
    <div className='container-fluid px-4 custom-view mt-5'>
      <div className='row'>
        <div className='col col-sm-12 col-md-4'>
            <RegisteredUsers
            setSelectedId={setSelectedId}
            />
        </div>
        <div className='col col-sm-12 col-md-8'>
        <h2>Usuario: {selected.name}</h2>
        
          <div className='userID mt-4'>
            <ul>
                <li>Email: {selected.email}</li>
                <li>Rol: {selected.role === 'EMPLOYEE'?  'Empleado':'Admin'}</li>
                <li>Requiere blanqueo de contraseña: {selected.changePassword ? 'Si':'No'}</li>
                <li>Acceso: {selected.access? 'Permitido':'Denegado'}</li>
            </ul>
          </div>
          <div className='mt-2'>
            
                <button 
                onClick={()=>{setChangePassword(!changePassword)}}
                className='btn btn-reserve'>
                 {
                    !changePassword? 'Crear contraseña temporal':'Ocultar acción temporal'
                 }   
                </button>
                {' '}
            
                <button className='btn btn-reserve' onClick={()=>{whitelistPassword(selected._id)}}>Forzar blanqueo de contraseña</button>
                {' '}
            
            {   
                selected.access? <button className='btn btn-reserve' onClick={()=>{denyAccess(selected._id)}}>Denegar acceso</button>: <button className='btn btn-reserve' onClick={()=>{grantAccess(selected._id)}}>Permitir acceso</button>
            }
            
            
          </div>
          {
        changePassword &&
        <div className='row mt-5'>
        <h2>Contraseña temporal</h2>
        <p>Esta acción generará una nueva contraseña <strong>temporal</strong> para el usuario <strong>"{selected.email}"</strong>.<br/>
        Luego de que el usuario acceda con la contraseña temporal, el mismo deberá blanquear su clave.
        </p>
        <form onSubmit={handleSubmit} className="row g-3 animate__animated animate__fadeIn">
            <div className="form-group col-md-6">
                <label htmlFor="password">Nueva contraseña temporal:</label>
                <input type="text" className="form-control" name="password" id="password" placeholder="Contraseña" onChange={handleInputChange} value={password} />
                <button className='btn btn-reserve mt-2'>Generar</button>
            </div>
        </form>
      </div>
      }
      </div>

      
      
      </div>
    </div>
  )
}
