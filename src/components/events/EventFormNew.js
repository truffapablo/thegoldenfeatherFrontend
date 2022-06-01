import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createEvent } from '../../actions/events';
import { removeError, setError } from '../../actions/ui';
import { validateEvent } from '../../helpers/eventHelper';
import { useForm } from '../../hooks/useForm'

export const EventFormNew = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { msgError } = useSelector(state => state.ui);
  const [formValues, handleInputChange, reset] = useForm({
      title: '',
      description: '',
      price:'',
      commission:'',
      currency:'',
      schedule:'',
      start:'',
      end:'',
      location:'',
      address:'',
      city:'',

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
      dispatch(createEvent(newEvent))
      .then((response) => {
        if(response) {

          Swal.fire({
              title: 'Evento creado',
              text: 'El evento se ha creado correctamente',
              icon: 'success',
              confirmButtonText: 'Ok'
          }).then(() => {
              reset();
              navigate('/dashboard/events');
          });
      }else{
          Swal.fire({
              title: 'Error',
              text: 'No se ha podido crear el evento',
              icon: 'error',
              confirmButtonText: 'Ok'
          });
      }
      });



    }
  }


  return (
    <form onSubmit={handleSubmit} className="row g-3 animate__animated animate__fadeIn">
        <div className="form-group col-md-12">
            <label htmlFor="title">Título:</label>
            <input type="text" className="form-control" name="title" value={title} id="title" placeholder="Título" onChange={handleInputChange}/>
            { msgError!==null && msgError.title && <div className="alert alert-danger">{msgError.title}</div> }
        </div>
        <div className="form-group col-md-12">
            <label htmlFor="description">Descripción:</label>
            <textarea name='description' className="form-control" value={description} placeholder="Descripción" onChange={handleInputChange}></textarea>
            { msgError!==null && msgError.description && <div className="alert alert-danger">{msgError.description}</div> }
        </div>
        <div className="form-group col-md-4">
            <label htmlFor="location">Ubicación:</label>
            <input type="text" className="form-control" name="location" value={location} id="location" placeholder="Ubicación" onChange={handleInputChange}/>
            { msgError!==null && msgError.location && <div className="alert alert-danger">{msgError.location}</div> }
        </div>
        <div className="form-group col-md-4">
            <label htmlFor="address">Dirección:</label>
            <input type="text" className="form-control" name="address" value={address} id="address" placeholder="Dirección" onChange={handleInputChange}/>
            { msgError!==null && msgError.address && <div className="alert alert-danger">{msgError.address}</div> }
        </div>
        <div className="form-group col-md-4">
            <label htmlFor="city">Ciudad:</label>
            <input type="text" className="form-control" name="city" value={city} id="city" placeholder="Dirección" onChange={handleInputChange}/>
            { msgError!==null && msgError.city && <div className="alert alert-danger">{msgError.city}</div> }
        </div>
        <div className="form-group col-md-4">
            <label htmlFor="price">Precio base:</label>
            <input type="number" className="form-control" name="price" value={price} id="price" placeholder="Precio base" onChange={handleInputChange}/>
            { msgError!==null && msgError.price && <div className="alert alert-danger">{msgError.price}</div> }
        </div>
        <div className="form-group col-md-4">
            <label htmlFor="commission">Comisión:</label>
            <input type="number" className="form-control" name="commission" value={commission} id="commission" placeholder="Comisión" onChange={handleInputChange}/>
            { msgError!==null && msgError.commission && <div className="alert alert-danger">{msgError.commission}</div> }
        </div>
        <div className="form-group col-md-4">
            <label htmlFor="currency">Moneda:</label>
            <input type="text" className="form-control" name="currency" value={currency} id="currency" placeholder="Comisión" onChange={handleInputChange}/>
            { msgError!==null && msgError.currency && <div className="alert alert-danger">{msgError.currency}</div> }
        </div>
        <div className="form-group col-md-12">
            <label htmlFor="schedule">Cronograma:</label>
            <textarea name='schedule' className="form-control" value={schedule} placeholder="Cronograma" onChange={handleInputChange}></textarea>
            { msgError!==null && msgError.schedule && <div className="alert alert-danger">{msgError.schedule}</div> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="start">Empieza:</label>
            <input type="time" className="form-control" name="start" value={start} id="start" placeholder="Empieza" onChange={handleInputChange}/>
            { msgError!==null && msgError.start && <div className="alert alert-danger">{msgError.start}</div> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="end">Termina:</label>
            <input type="time" className="form-control" name="end" value={end} id="end" placeholder="Empieza" onChange={handleInputChange}/>
            { msgError!==null && msgError.end && <div className="alert alert-danger">{msgError.end}</div> }
        </div>
        <button type="submit" className="btn btn-primary btn-reserve">Crear Evento</button>
        
    </form>
  )
}
