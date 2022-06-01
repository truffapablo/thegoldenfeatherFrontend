import React from 'react'
import { useSelector } from 'react-redux';

export const InputFormPriceAndCommision = ({price, commission, handleInputChange}) => {
    const { msgError } = useSelector(state => state.ui);
  return (
    <>
    <div className="form-group col-md-6">
            <label htmlFor="price">Precio base</label>
            <input type="number" className="form-control" name="price" value={price} id="price" placeholder="Precio base" onChange={handleInputChange}/>
            { msgError!==null && msgError.price && <div className="alert alert-danger">{msgError.price}</div> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="commission">Comisión</label>
            <input type="number" className="form-control" name="commission" value={commission} id="commission" placeholder="Comisión" onChange={handleInputChange}/>
            { msgError!==null && msgError.commission && <div className="alert alert-danger">{msgError.commission}</div> }
        </div>
    </>
  )
}
