import React from 'react'
import { LoginForm } from './LoginForm'
import '../../styles/stylesAuth.scss';

export const LoginView = () => {
  return (
    <div className='container-fluid auth-container-fluid'>
    <div className='container auth-container'>
      <LoginForm/>
    </div>
    </div>

  )
}
