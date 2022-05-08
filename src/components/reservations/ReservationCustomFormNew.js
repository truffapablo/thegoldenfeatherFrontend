import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { startCustomReservation } from '../../actions/customReservation';
import { removeError, setError} from '../../actions/ui';
import { validateCustomReservation } from '../../helpers/customReservation';
import { useForm } from '../../hooks/useForm';

export const ReservationCustomFormNew = () => {
  

    const navigate = useNavigate();
    const { msgError } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const [ formValues, handleInputChange, reset ] = useForm({
    event: '',
    firstName: '',
    lastName: '',
    email:'',
    phone: '',
    date: '',
    time: '',
    peopleQuantity: '',
    roomNumber: '',
    price: '',
    commission: '',
  });


  const { event, firstName, lastName, date, peopleQuantity, roomNumber, time, email, phone, price, commission} = formValues;


    const handleSubmit = (e) => {
        
        e.preventDefault();
        dispatch(removeError());
        const errors = validateCustomReservation(formValues);
        dispatch(setError(errors));
        
        if(Object.keys(errors).length === 0) {

            dispatch(removeError());

            const newReservation = {
                event,
                firstName,
                lastName,
                peopleQuantity,
                roomNumber,
                email,
                phone,
                date,
                time: moment(time, 'HH:mm').format('HH:mm'),
                price,
                commission
            }
            
            dispatch(startCustomReservation(newReservation))
            .then(response => {
                if(response) {

                    Swal.fire({
                        title: 'Reserva creada',
                        text: 'La reserva personalizada se ha creado correctamente',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then(() => {
                        reset();
                        navigate('/dashboard/reservations');
                    });
                }else{
                    Swal.fire({
                        title: 'Error',
                        text: 'No se ha podido crear la reserva',
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
            <label htmlFor="event">Reserva:</label>
            <input type="text" className="form-control" name="event" value={event} id="event" placeholder="Reserva" onChange={handleInputChange}/>
            { msgError!==null && msgError.event && <div className="alert alert-danger">{msgError.event}</div> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="firstName">Nombre:</label>
            <input type="text" className="form-control" name="firstName" value={firstName} id="firstName" placeholder="Nombre" onChange={handleInputChange}/>
            { msgError!==null && msgError.firstName && <div className="alert alert-danger">{msgError.firstName}</div> }
        </div>
        
        <div className="form-group col-md-6">
            <label htmlFor="lastName">Apellido:</label>
            <input type="text" className="form-control" name="lastName" value={lastName} id="lastName" placeholder="Apellido" onChange={handleInputChange}/>
            { msgError!==null && msgError.lastName && <div className="alert alert-danger">{msgError.lastName}</div> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="email">Email:</label>
            <input type="email" className="form-control" name="email" value={email} id="email" placeholder="Email" onChange={handleInputChange}/>
            { msgError!==null && msgError.email && <div className="alert alert-danger">{msgError.email}</div> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="phone">Teléfono:</label>
            <input type="text" className="form-control" name="phone" value={phone} id="phone" placeholder="Teléfono" onChange={handleInputChange}/>
            { msgError!==null && msgError.phone && <div className="alert alert-danger">{msgError.phone}</div> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="date">Fecha</label>
            <input type="date" className="form-control" name="date" value={date} id="date" placeholder="Fecha" onChange={handleInputChange}/>
            { msgError!==null && msgError.date && <div className="alert alert-danger">{msgError.date}</div> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="time">Horario</label>
            <input type="time" className="form-control" name="time" value={time} id="time" placeholder="Horario" onChange={handleInputChange}/>
            { msgError!==null && msgError.time && <div className="alert alert-danger">{msgError.time}</div> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="peopleQuantity">Cantidad de personas:</label>
            <input type="number" className="form-control" name="peopleQuantity" value={peopleQuantity} id="peopleQuantity" placeholder="Cantidad de personas" onChange={handleInputChange}/>
            { msgError!==null && msgError.peopleQuantity && <div className="alert alert-danger">{msgError.peopleQuantity}</div> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="roomNumber">Número de habitación</label>
            <input type="text" className="form-control" name="roomNumber" value={roomNumber} id="roomNumber" placeholder="Número de habitación" onChange={handleInputChange}/>
            { msgError!==null && msgError.roomNumber && <div className="alert alert-danger">{msgError.roomNumber}</div> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="price">Precio</label>
            <input type="text" className="form-control" name="price" value={price} id="price" placeholder="Precio" onChange={handleInputChange}/>
            { msgError!==null && msgError.price && <div className="alert alert-danger">{msgError.price}</div> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="commission">Comisión</label>
            <input type="text" className="form-control" name="commission" value={commission} id="commission" placeholder="Comisión" onChange={handleInputChange}/>
            { msgError!==null && msgError.commission && <div className="alert alert-danger">{msgError.commission}</div> }
        </div>
        <button type="submit" className="btn btn-primary btn-reserve">Reservar</button>
        
    </form>
  )
}   
