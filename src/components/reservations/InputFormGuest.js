import React from 'react'
import { useSelector } from 'react-redux';

export const InputFormGuest = ({firstName, lastName, email, phone, handleInputChange}) => {
    const { msgError } = useSelector(state => state.ui);
  return (
    <>
    <div className="form-group col-md-6">
            <label htmlFor="firstName">Nombre:</label>
            <input type="text" className="form-control" name="firstName" value={firstName} id="firstName" placeholder="Nombre" onChange={handleInputChange}/>
            { msgError!==null && msgError.firstName && <small className="form-text text-danger">{msgError.firstName}</small> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="lastName">Apellido:</label>
            <input type="text" className="form-control" name="lastName" value={lastName} id="lastName" placeholder="Apellido" onChange={handleInputChange}/>
            { msgError!==null && msgError.lastName && <small className="form-text text-danger">{msgError.lastName}</small> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="email">Email:</label>
            <input type="email" className="form-control" name="email" value={email} id="email" placeholder="Email" onChange={handleInputChange}/>
            { msgError!==null && msgError.email && <small className="form-text text-danger">{msgError.email}</small> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="phone">Teléfono:</label>
            <input type="text" className="form-control" name="phone" value={phone} id="phone" placeholder="Teléfono" onChange={handleInputChange}/>
            { msgError!==null && msgError.phone && <small className="form-text text-danger">{msgError.phone}</small> }
        </div>
    </>
  )
}
