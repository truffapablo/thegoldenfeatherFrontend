import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { registerWithEmailAndPassword, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm'
import {setError, removeError, startLoading, finishLoading} from '../../actions/ui';

import validator from 'validator';
import { Logo } from '../logo/Logo';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export const RegisterForm = () => {

    
    const dispatch = useDispatch();
    const { msgError, loading } = useSelector( state => state.ui);
    
  const [formValues, handleInputChange, reset] = useForm({
        name:'',
        email:'',
        password:'',
        password2:''
  })

    const {name, email, password, password2} = formValues;
    /**TODO Validar */
    const handleRegister = async (e)=>{
        e.preventDefault();
        if(isFormValid()){
            
            dispatch(startRegister({
                name,
                email,
                password
            })
            
            ).then(response => {
                console.log(response);
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
        if(name.trim().length === 0){
            dispatch(setError('El nombre es obligatorio'));
            return false;
        }else if(!validator.isEmail( email )){
            dispatch(setError('El email no es valido'));
            return false;
        }else if(password !== password2 || password.trim().length < 6){
            dispatch(setError('Las contraseñas no coinciden o son incorrectas'));
            return false;
        }
        dispatch(removeError());
        return true;
    }


  return (
    <div className='mt-5'>
        {/* <Logo/> */}
        <h2>Registrar usuario</h2>
        <form onSubmit={handleRegister}>
            {
                msgError && <div className="alert alert-danger">{msgError}</div>
            }
            <div className="mb-3">
                <input 
                type="text"
                placeholder="Nombre"
                name="name"
                className="form-control"
                autoComplete="off"
                value={ name }
                onChange={ handleInputChange }
                />
            </div>
            <div className="mb-3">
                <input 
                type="text"
                placeholder="Email"
                name="email"
                className="form-control"
                autoComplete="off"
                value={ email }
                onChange={ handleInputChange }
                />
            </div>

            <div className="mb-3">
                <input 
                type="password"
                placeholder="Password"
                name="password"
                className="form-control"
                value={ password }
                onChange={ handleInputChange } 
                />
            </div>
            <div className="mb-3">
                <input 
                type="password"
                placeholder="Confirmar password"
                name="password2"
                className="form-control"
                value={ password2 }
                onChange={ handleInputChange } 
                />
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
