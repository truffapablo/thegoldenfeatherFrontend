import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { updateEvent } from '../../actions/events';
import { removeError, setError } from '../../actions/ui';
import { validateEvent } from '../../helpers/eventHelper';
import { useForm } from '../../hooks/useForm'

export const EventFormEdit = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {id} = useParams();
  
  const event = useSelector(state => state.events.list.find(ev => ev.id === id));

  const { msgError } = useSelector(state => state.ui);
  const [formValues, handleInputChange, reset] = useForm({
        title: event.title,
        description: event.description,
        start: event.start,
        end: event.end,
        price: event.price,
        commission: event.commission,
        currency: event.currency,
        schedule: event.schedule,
        start: event.start,
        end: event.end,
        location: event.location,
        address: event.address,
        city: event.city,
  });

  const {title, description, price, commission, currency, schedule, start, end, location, address, city} = formValues;

  const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(removeError());
        const errors = validateEvent(formValues);
        dispatch(setError(errors));

        if(Object.keys(errors).length === 0) {
            dispatch(removeError());

            const newEvent =  {
                ...formValues,
            }
            
            dispatch(updateEvent(id, newEvent))
            .then((response) => {
                /**
                 * Si el evento se actualiza correctamente,
                 * actualizamos los datos de las reservaciones con ese evento
                 */

                if(response) {

                    Swal.fire({
                        title: 'Evento editado',
                        text: 'El evento se ha editado correctamente',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then(() => {
                        reset();
                        navigate('/dashboard/events');
                    });
                }else{
                    Swal.fire({
                        title: 'Error',
                        text: 'No se ha podido editar el evento',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            })


        }
    
    }

    
    

  return (
    <form onSubmit={handleSubmit} className="row g-3 animate__animated animate__fadeIn">
        <div className="form-group col-md-12">
            <label htmlFor="title">Título:</label>
            <input type="text" className="form-control" name="title" value={title} id="title" placeholder="Título" onChange={handleInputChange}/>
            { msgError!==null && msgError.title && <small className="form-text text-danger">{msgError.title}</small> }
        </div>
        <div className="form-group col-md-12">
            <label htmlFor="description">Descripción:</label>
            <textarea name='description' className="form-control" value={description} placeholder="Descripción" onChange={handleInputChange}></textarea>
            { msgError!==null && msgError.description && <small className="form-text text-danger">{msgError.description}</small> }
        </div>
        <div className="form-group col-md-4">
            <label htmlFor="location">Ubicación:</label>
            <input type="text" className="form-control" name="location" value={location} id="location" placeholder="Ubicación" onChange={handleInputChange}/>
            { msgError!==null && msgError.location && <small className="form-text text-danger">{msgError.location}</small> }
        </div>
        <div className="form-group col-md-4">
            <label htmlFor="address">Dirección:</label>
            <input type="text" className="form-control" name="address" value={address} id="address" placeholder="Dirección" onChange={handleInputChange}/>
            { msgError!==null && msgError.address && <small className="form-text text-danger">{msgError.address}</small> }
        </div>
        <div className="form-group col-md-4">
            <label htmlFor="city">Ciudad:</label>
            <input type="text" className="form-control" name="city" value={city} id="city" placeholder="Dirección" onChange={handleInputChange}/>
            { msgError!==null && msgError.city && <small className="form-text text-danger">{msgError.city}</small> }
        </div>
        <div className="form-group col-md-4">
            <label htmlFor="price">Precio:</label>
            <input type="number" className="form-control" name="price" value={price} id="price" placeholder="Precio" onChange={handleInputChange}/>
            { msgError!==null && msgError.price && <small className="form-text text-danger">{msgError.price}</small> }
        </div>
        <div className="form-group col-md-4">
            <label htmlFor="commission">Comisión:</label>
            <input type="number" className="form-control" name="commission" value={commission} id="commission" placeholder="Comisión" onChange={handleInputChange}/>
            { msgError!==null && msgError.commission && <small className="form-text text-danger">{msgError.commission}</small> }
        </div>
        <div className="form-group col-md-4">
            <label htmlFor="currency">Moneda:</label>
            <input type="text" className="form-control" name="currency" value={currency} id="currency" placeholder="Comisión" onChange={handleInputChange}/>
            { msgError!==null && msgError.currency && <small className="form-text text-danger">{msgError.currency}</small> }
        </div>
        <div className="form-group col-md-12">
            <label htmlFor="schedule">Cronograma:</label>
            <textarea name='schedule' className="form-control" value={schedule} placeholder="Cronograma" onChange={handleInputChange}></textarea>
            { msgError!==null && msgError.schedule && <small className="form-text text-danger">{msgError.schedule}</small> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="start">Empieza:</label>
            <input type="time" className="form-control" name="start" value={start} id="start" placeholder="Empieza" onChange={handleInputChange}/>
            { msgError!==null && msgError.start && <small className="form-text text-danger">{msgError.start}</small> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="end">Termina:</label>
            <input type="time" className="form-control" name="end" value={end} id="end" placeholder="Empieza" onChange={handleInputChange}/>
            { msgError!==null && msgError.end && <small className="form-text text-danger">{msgError.end}</small> }
        </div>
        <button type="submit" className="btn btn-primary btn-reserve">Editar Evento</button>
        
    </form>
  )
}
