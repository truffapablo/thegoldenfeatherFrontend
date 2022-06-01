import React from 'react'
import { useSelector } from 'react-redux';
export const InputFormDateTime = ({date, time, handleInputChange}) => {
    const { msgError } = useSelector(state => state.ui);
  return (
    <>
    <div className="form-group col-md-6">
            <label htmlFor="date">Fecha</label>
            <input type="date" className="form-control" name="date" value={date} id="date" placeholder="Fecha" onChange={handleInputChange}/>
            { msgError!==null && msgError.date && <small className="form-text text-danger">{msgError.date}</small> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="time">Horario</label>
            <input type="time" className="form-control" name="time" value={time} id="time" placeholder="Horario" onChange={handleInputChange}/>
            { msgError!==null && msgError.time && <small className="form-text text-danger">{msgError.time}</small> }
        </div>
    </>
  )
}
