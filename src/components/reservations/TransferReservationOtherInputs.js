import React from 'react'
import { useSelector } from 'react-redux'

export const TransferReservationOtherInputs = ({handleInputChange, origin, destination, price, commission }) => {
    
    const {msgError} = useSelector(state => state.ui);
    return (
    <>
        <div className="form-group col-md-6">
            <label htmlFor="origin">Origen:</label>
            <input type="text" className="form-control" name="origin" id="origin" placeholder="Origen" onChange={handleInputChange} value={origin} />
            {msgError !== null && msgError.origin && <small className="form-text text-danger">{msgError.origin}</small>}
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="destination">Destino:</label>
            <input type="text" className="form-control" name="destination" id="destination" placeholder="Destino" onChange={handleInputChange} value={destination} />
            {msgError !== null && msgError.destination && <small className="form-text text-danger">{msgError.destination}</small>}
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="price">Precio base:</label>
            <input type="number" className="form-control" name="price" id="price" placeholder="Precio" onChange={handleInputChange} value={price} />
            {msgError !== null && msgError.price && <small className="form-text text-danger">{msgError.price}</small>       }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="commission">Comisión:</label>
            <input type="number" className="form-control" name="commission" id="commission" placeholder="Comisión" onChange={handleInputChange} value={commission} />
            {msgError !== null && msgError.commission && <small className="form-text text-danger">{msgError.commission}</small>}
        </div>
    </>
  )
}
