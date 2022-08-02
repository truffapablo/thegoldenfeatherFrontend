import React from 'react'
import { RegisterForm } from './RegisterForm'
import '../../styles/stylesAuth.scss';
import { RegisteredUsers } from './RegisteredUsers';

export const RegisterView = () => {
  return (
    <div className='container-fluid px-4 custom-view'>
      <div className='row'>
          <div className='col-md-6'>
            <RegisterForm/>
          </div>
      </div>
    
    </div>
  )
}
