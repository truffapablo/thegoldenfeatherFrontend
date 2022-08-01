import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const SelectEmployee = ({setSelectedEmployee}) => {
    
    const {users, role, uid, name} = useSelector(state => state.auth);
    const selectEmployee = (e) => {
        setSelectedEmployee({
            select:true,
            employee:e.target.value
        });
    }


    return (
    <>
    <div className='form-group'>
    <label htmlFor='select-employee'>Selecionar empleado</label>
    <select className='form-select' id='select-employee' onChange={(e)=>{selectEmployee(e)}}>
        <option value="all">Todos</option>
        {
            users && users.map((user, index) =>{
                return(
                    <option key={index} value={user._id}>{user.name}</option>
                )
            })
        }
        <option value={uid}>{name}</option>
    </select>
    </div>
    </>
  )
}
