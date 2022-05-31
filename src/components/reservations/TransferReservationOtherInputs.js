import React from 'react'

export const TransferReservationOtherInputs = ({handleInputChange, origin, destination, price, commission }) => {
  return (
    <>
        <div className="form-group col-md-6">
            <label htmlFor="origin">Origen:</label>
            <input type="text" className="form-control" name="origin" id="origin" placeholder="Origen" onChange={handleInputChange} value={origin} />
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="destination">Destino:</label>
            <input type="text" className="form-control" name="destination" id="destination" placeholder="Destino" onChange={handleInputChange} value={destination} />
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="price">Precio base:</label>
            <input type="number" className="form-control" name="price" id="price" placeholder="Precio" onChange={handleInputChange} value={price} />
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="commission">Comisión:</label>
            <input type="number" className="form-control" name="commission" id="commission" placeholder="Comisión" onChange={handleInputChange} value={commission} />
        </div>
    </>
  )
}
