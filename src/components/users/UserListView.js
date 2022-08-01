import React from 'react'
import { RegisteredUsers } from '../register/RegisteredUsers'



export const UserListView = () => {
  
  return (
    <div className='container-fluid px-4 custom-view'>
      <div className='row'>
          <div className='col-md-4'>
            <RegisteredUsers/>
          </div>
      </div>
    
    </div>
  )
}
