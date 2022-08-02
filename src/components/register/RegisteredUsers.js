import React, { useContext, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

export const RegisteredUsers = ({setSelectedId}) => {

  const {users} = useSelector(state => state.auth);
  const navigate = useNavigate();
  const selectUser = (id) => {
    setSelectedId(id);
  }

  return (
    <div>
      <h2>Usuarios Registrados</h2>
      <ul className='mt-4 list-group list-group-numbered'>
          {
            users.map((user, index) => {
              return(
                <li 
                className=' cpointer list-group-item d-flex justify-content-between align-items-start' 
                key={index}
                onClick={()=>{selectUser(user._id)}}
                >
                  <div className="ms-2 me-auto">
                  <div className="fw-bold">{user.name}</div>
                   {user.email}
                  </div>
                </li>
              )
            })
          }
      </ul>
    </div>
  )
}
