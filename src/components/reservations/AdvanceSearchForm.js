import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { advanceSearch } from '../../actions/search';
import { useForm } from '../../hooks/useForm';
import { types } from '../../types/types';

export const AdvanceSearchForm = () => {

    const [loading, setLoading] = useState(false);
    const [ formValues, handleInputChange, reset ] = useForm({
        confirmation: '',
        date: '',
        event: '',
        lastName: '',
    });

    const [btnenabled, setBtnEnabled] = useState(false);

    const { confirmation, date, event, lastName } = formValues;

    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!confirmation && !date && !event && !lastName){return false}
        
        setLoading(true);
        dispatch(advanceSearch({
            confirmation: confirmation || null,
            date: date || null,
            event: event || null,
            lastName: lastName || null,
        })).then(rta => {
            
            setLoading(false);
            dispatch({type:types.reservationFinishAdvanceSearch});
            if(rta.ok){
                dispatch({
                    type:types.reservationCleanSearch
                  });
                dispatch({
                    type:types.reservationSetAdvanceSearch,
                    payload:rta
                });
            }{
                setLoading(false); 
            }
        });

        //reset();
    }

    useEffect(()=>{
        if(!confirmation && !date && !event && !lastName){
            setBtnEnabled(false);
        }else{
            setBtnEnabled(true);
        }
    },[formValues])

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
        {
            loading && <button 
            type="submit" 
            className="btn btn-reserve"
            disabled
            >
            <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                />
                {' '}
                Buscando</button>
        }
        {

            !loading && <button type="submit" className="btn btn-reserve" disabled={!btnenabled} >Buscar</button>
        }
        </div>
    </form>
    </div>
    </>
  )
}
