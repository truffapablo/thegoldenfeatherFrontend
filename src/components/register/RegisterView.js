import React from 'react'
import { RegisterForm } from './RegisterForm'
import '../../styles/stylesAuth.scss';

export const RegisterView = () => {
  return (
    <div className='container-fluid auth-container-fluid'>
    <div className='container auth-container'>
        <RegisterForm/>
    </div>
    </div>
  )
}
