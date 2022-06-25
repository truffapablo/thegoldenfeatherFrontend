import React , { useEffect }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { startLogin } from '../../actions/auth';
import { validateLogin } from '../../helpers/validateLogin';
import { useForm } from '../../hooks/useForm';
import {Logo} from '../logo/Logo';

export const LoginForm = () => {

  const dispatch = useDispatch();
  const { msgError} = useSelector( state => state.ui);
  const [formValues, handleInputChange] = useForm({
      email:'',
      password:''
  })

  const {email, password} = formValues;

  const handleLogin = (e)=>{
    e.preventDefault();
    const {isValid, errors} = validateLogin(email,password);
    if(!isValid){
      return false;
    }
    dispatch(startLogin(email, password));
  }
  


  
  return (
        <div className='gf-auth-login mt-5'>
        <Logo/>
        <form onSubmit={handleLogin}>
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
            <div className='d-grid gap-2'>
            <button
            id='gf-btn-login'
            type="submit" 
            className="btn btn-primary btn-block"
            >Iniciar sesión</button>
            </div>
            
            {/* <div className='mt-2'>
              <p>No tienes cuenta? <NavLink
              to='/register'
              >Registrate</NavLink> </p>
            </div> */}
          
          { msgError && <div className="alert alert-danger">{msgError}</div> }
          

        </form>
        </div>


  )
}
