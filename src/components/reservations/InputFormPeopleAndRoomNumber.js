import React from 'react'
import { useSelector } from 'react-redux';

export const InputFormPeopleAndRoomNumber = ({peopleQuantity, roomNumber, handleInputChange}) => {
    const { msgError } = useSelector(state => state.ui);
  return (
    <>
        <div className="form-group col-md-6">
            <label htmlFor="peopleQuantity">Cantidad de personas:</label>
            <input type="number" className="form-control" name="peopleQuantity" value={peopleQuantity} id="peopleQuantity" placeholder="Cantidad de personas" onChange={handleInputChange}/>
            { msgError!==null && msgError.peopleQuantity && <small className="form-text text-danger">{msgError.peopleQuantity}</small> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="roomNumber">Número de habitación</label>
            <input type="text" className="form-control" name="roomNumber" value={roomNumber} id="roomNumber" placeholder="Número de habitación" onChange={handleInputChange}/>
            { msgError!==null && msgError.roomNumber && <small className="form-text text-danger">{msgError.roomNumber}</small> }
        </div>
    </>
  )
}
