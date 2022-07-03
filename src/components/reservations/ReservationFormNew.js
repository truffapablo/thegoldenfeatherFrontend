import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

import { startNewReservation } from '../../actions/reservation';
import { removeError, setError} from '../../actions/ui';
import { validateReservation } from '../../helpers/reservationHelper';
import { useForm } from '../../hooks/useForm';
import { SelectEvent } from './SelectEvent';
export const ReservationFormNew = () => {
  

    const navigate = useNavigate();
    const { msgError } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const {list} = useSelector(state => state.events);
  
    const [ formValues, handleInputChange, reset ] = useForm({
    firstName: '',
    lastName: '',
    email:'',
    phone: '',
    date: '',
    time: '',
    peopleQuantity: '',
    roomNumber: '',
    event: '',
  });


  const { event, firstName, lastName, date, peopleQuantity, roomNumber, time, email, phone} = formValues;

  useEffect(() => {
    if(list.length == 0 || list === undefined || list === null) {
        
        Swal.fire({
             title: 'No hay eventos',
             text: 'No se puede crear una reserva de evento sin eventos. Por favor, cree un evento.',
             icon: 'info',
             confirmButtonText: 'Aceptar'
         });
         navigate('/dashboard/events/new');
    }else{

        handleInputChange({
            target: {
                name: 'time',
                value: list[0].start
            }
        });
        handleInputChange({
            target: {
                name: 'event',
                value: list[0].id
            }
        });
     
    }
   

  } , [list]);

  useEffect(() => {
      if(list && list.length > 0) {
    
        let eventExists = list.find(ev => ev.id === event);
        
        if(eventExists){
            handleInputChange({
                target: {
                    name: 'time',
                    value: eventExists.start
                }
            });
            
        }
    }

  } , [event]);


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
        
        dispatch(removeError());
        const errors = validateReservation(formValues);
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
            }
            
            dispatch(startNewReservation(newReservation))
            .then(response => {
                if(response) {

                    Swal.fire({
                        title: 'Reserva creada',
                        text: 'La reserva se ha creado correctamente',
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
        
        <div className="form-group">
        <label htmlFor="event">Evento:</label>
            <SelectEvent 
                event={event}
                list={list}
                handleInputChange={handleInputChange}
            />
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="firstName">Nombre:</label>
            <input type="text" className="form-control" name="firstName" value={firstName} id="firstName" placeholder="Nombre" onChange={handleInputChange}/>
            { msgError!==null && msgError.firstName && <small className="form-text text-danger">{msgError.firstName}</small> }
        </div>
        
        <div className="form-group col-md-6">
            <label htmlFor="lastName">Apellido:</label>
            <input type="text" className="form-control" name="lastName" value={lastName} id="lastName" placeholder="Apellido" onChange={handleInputChange}/>
            { msgError!==null && msgError.lastName && <small className="form-text text-danger">{msgError.lastName}</small> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="email">Email:</label>
            <input type="email" className="form-control" name="email" value={email} id="email" placeholder="Email" onChange={handleInputChange}/>
            { msgError!==null && msgError.email && <small className="form-text text-danger">{msgError.email}</small> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="phone">Teléfono:</label>
            <input type="text" className="form-control" name="phone" value={phone} id="phone" placeholder="Teléfono" onChange={handleInputChange}/>
            { msgError!==null && msgError.phone && <small className="form-text text-danger">{msgError.phone}</small> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="date">Fecha</label>
            <input type="date" className="form-control" name="date" value={date} id="date" placeholder="Fecha" onChange={handleInputChange}/>
            { msgError!==null && msgError.date && <small className="form-text text-danger">{msgError.date}</small> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="time">Horario</label>
            <input type="time" disabled className="form-control" name="time" value={time} id="time" placeholder="Horario" onChange={handleInputChange}/>
            { msgError!==null && msgError.time && <small className="form-text text-danger">{msgError.time}</small> }
        </div>
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
        <button type="submit" className="btn btn-primary btn-reserve">Reservar</button>
        
    </form>
  )
}   
