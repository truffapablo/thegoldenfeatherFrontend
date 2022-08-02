import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { registerWithEmailAndPassword, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm'
import {setError, removeError, startLoading, finishLoading} from '../../actions/ui';

import validator from 'validator';
import { Logo } from '../logo/Logo';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { validateRegister } from '../../helpers/validateRegister';

export const RegisterForm = () => {

    
    const dispatch = useDispatch();
    const { msgError, loading } = useSelector( state => state.ui);
    
  const [formValues, handleInputChange, reset] = useForm({
        name:'',
        email:'',
        password:'',
        password2:''
  });
  

    const {name, email, password, password2} = formValues;
    /**TODO Validar */
    const handleRegister = async (e)=>{
        e.preventDefault();
        dispatch(removeError());
        
        if(isFormValid()){
            
            
            dispatch(startRegister({
                name,
                email,
                password
            })
            
            ).then(response => {
                
                if(response.ok){
                    Swal.fire({
                        title: 'Usuario creado',
                        text: 'El usuario se ha creado correctamente',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });

                    reset();
                }else{
                    Swal.fire({
                        title: 'Error',
                        text: `No se pudo crear el usuario. ${response.msg}`,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            });
        }
    }
    
    const isFormValid = () => {
        const errors = validateRegister(formValues);
        dispatch(setError(errors));

        if(Object.keys(errors).length === 0){
            dispatch(removeError());
            return true;
        }
    }


  return (
    <div className='mt-5'>
        {/* <Logo/> */}
        <h2>Registrar usuario</h2>
        <form onSubmit={handleRegister} className="mt-2 row g-3 animate__animated animate__fadeIn">
            <div className='form-group'>
                <label htmlFor="register-name">Nombre:</label>
                
                <input 
                type="text"
                id='register-name'
                placeholder="Nombre"
                name="name"
                className="form-control"
                autoComplete="off"
                value={ name }
                onChange={ handleInputChange }
                />
                { msgError!==null && msgError.name && <small className="form-text text-danger">{msgError.name}</small> }
            </div>
            
            <div className='form-group'>
                <label htmlFor="register-email">Email:</label>
                
                    <input 
                    type="text"
                    id='register-email'
                    placeholder="Email"
                    name="email"
                    className="form-control"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                    />
                    { msgError!==null && msgError.email && <small className="form-text text-danger">{msgError.email}</small> }
                
            </div>

            <div className='form-group'>
                <label htmlFor="register-password">Contraseña:</label>
                
                    <input 
                    type="password"
                    id='register-password'
                    placeholder="Contraseña"
                    name="password"
                    className="form-control"
                    value={ password }
                    onChange={ handleInputChange } 
                    />
                    { msgError!==null && msgError.password && <small className="form-text text-danger">{msgError.password}</small> }
                
            </div>

            <div className='form-group'>
                <label htmlFor="register-confirm-password">Confirmar contraseña:</label>
                
                    <input 
                    type="password"
                    id='register-confirm-password'
                    placeholder="Confirmar contraseña"
                    name="password2"
                    className="form-control"
                    value={ password2 }
                    onChange={ handleInputChange } 
                    />
                    { msgError!==null && msgError.password2 && <small className="form-text text-danger">{msgError.password2}</small> }
                
            </div>
            <div className='d-grid gap-2'>
            <button 
            type="submit" 
            id='gf-btn-register'
            className="btn btn-primary btn-block"
            disabled={loading}
            >Registrar</button>
            </div>
            {/* <div className='mt-2'>
                <p>¿Ya tienes cuenta? <Link to='/login'>Iniciar sesión</Link> </p>
            </div> */}
        </form>

    </div>




    )
}
