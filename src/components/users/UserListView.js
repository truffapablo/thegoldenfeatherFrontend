import React from 'react'
import { useParams } from 'react-router-dom';
import { UserList } from './UserList'

export const UserListView = () => {
  return (
    <div className='container-fluid px-4 custom-view'>
      
     <UserList/>
    
    </div>
  )
}
