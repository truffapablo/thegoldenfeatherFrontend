import React from 'react'
import { useSelector } from 'react-redux'

export const RegisteredUsers = () => {

  const {users} = useSelector(state => state.auth);

  return (
    <div className='mt-5'>
      <h2>Usuarios Registrados</h2>
      <ul className='mt-4 list-group list-group-numbered'>
          {
            users.map((user, index) => {
              return(
                <li className='list-group-item d-flex justify-content-between align-items-start' key={index}>
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
