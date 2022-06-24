import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { advanceSearch } from '../../actions/search';
import { useForm } from '../../hooks/useForm';

export const AdvanceSearchForm = () => {


    const [ formValues, handleInputChange, reset ] = useForm({
        confirmation: '',
        date: '',
        event: '',
        lastName: '',
    });

    const { confirmation, date, event, lastName } = formValues;

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        dispatch(advanceSearch({
            confirmation: confirmation || null,
            date: date || null,
            event: event || null,
            lastName: lastName || null,
        }));

        //reset();
    }

  return (
    <>
    <div className='advanceSearchForm'>
    <h3 className='mt-3'>Buscador de reservas</h3>
    <form onSubmit={handleSubmit} className="row g-3 animate__animated animate__fadeIn">
        <div className='form-group col-md-3'>
            <label htmlFor="confirmation">Confirmación:</label>
            <input type="text" value={confirmation} className="form-control" name="confirmation" id="confirmation" placeholder="#Confirmación" onChange={handleInputChange} />
        </div>
        <div className='form-group col-md-3'>
            <label htmlFor="date">Fecha:</label>
            <input type="date" value={date} className="form-control" name="date" id="date" onChange={handleInputChange}/>
        </div>
        <div className='form-group col-md-3'>
            <label htmlFor="event">Evento:</label>
            <input type="text" value={event} className="form-control" name="event" id="event" placeholder="Evento" onChange={handleInputChange}/>
        </div>
        <div className='form-group col-md-3'>
            <label htmlFor="lastName">Apellido:</label>
            <input type="text" value={lastName} className="form-control" name="lastName" id="lastName" placeholder="Apellido" onChange={handleInputChange}/>
        </div>
        <div className='d-grid gap-2'>
            <button type="submit" className="btn btn-primary btn-reserve">Buscar</button>
        </div>
    </form>
    </div>
    </>
  )
}
