import React , { useEffect, useState }from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLogin } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';

import { validateLogin } from '../../helpers/validateLogin';
import { useForm } from '../../hooks/useForm';
import {Logo} from '../logo/Logo';

export const LoginForm = () => {

  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch();
  const { msgError} = useSelector( state => state.ui);
  const [formValues, handleInputChange] = useForm({
      email:'',
      password:''
  })

  const {email, password} = formValues;

  const handleLogin = (e)=>{
    dispatch(removeError());
    setLoading(true)
    e.preventDefault();
    const {isValid, errors} = validateLogin(email,password);

    dispatch(setError(errors));
    
    if(!isValid){
      setLoading(false)
      return false;
    }
    dispatch(startLogin(email, password)).then(rta=>{
      setLoading(false)
    });
  }
  


  
  return (
        <div className='gf-auth-login mt-5'>
        <Logo/>
        <form onSubmit={handleLogin} id="login-form">
            <div className="form-group mt-2">
                <label htmlFor='login-email'>Usuario:</label>
                <input 
                type="text"
                id='login-email'
                placeholder="Usuario"
                name="email"
                className="form-control"
                autoComplete="off"
                value={ email }
                onChange={ handleInputChange }
                />
            { msgError!==null && msgError.email && <small className="form-text text-danger">{msgError.email}</small> }
            </div>
            <div className="form-group mt-2">
              <label htmlFor='login-password'>Contraseña:</label>
                <input 
                type="password"
                id='login-password'
                placeholder="Contraseña"
                name="password"
                className="form-control"
                value={ password }
                onChange={ handleInputChange } 
                />
            { msgError!==null && msgError.password && <small className="form-text text-danger">{msgError.password}</small> }
            </div>
            <div className='d-grid gap-2 mt-2'>
            {
              !loading && 
              <button
              id='gf-btn-login'
              type="submit" 
              className="btn btn-primary btn-block"
              >Iniciar sesión
              </button>
            }
            {
              loading && 
              <button
              id='gf-btn-login'
              type="submit" 
              className="btn btn-primary btn-block"
              disabled
              >
                <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
                {' '} Iniciar sesión
              </button>
            }
            
            
            </div>      

        </form>
        </div>


  )
}
