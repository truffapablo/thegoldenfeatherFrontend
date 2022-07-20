import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { updateReservation } from '../../actions/reservation';

import { removeError, setError} from '../../actions/ui';
import { validateReservation } from '../../helpers/reservationHelper';
import { useForm } from '../../hooks/useForm';
import { convertDate } from '../../helpers/convertDate';
import { today } from '../../helpers/today';
import moment from 'moment';
import { types } from '../../types/types';
import socket from '../../sockets/config';


export const ReservationFormEdit = () => {
    const { msgError }          = useSelector(state => state.ui);
    const {list}                = useSelector(state => state.events);
    const {advanceSearch}       = useSelector(state => state.search);
    const reList                = useSelector(state => state.reservations);
    const dispatch              = useDispatch();
    const navigate              = useNavigate();
    
    const {id}                  = useParams();

    const reservation = reList.list.find(reservation => reservation.id === id) || advanceSearch.data.find(reservation => reservation.id === id);
    const [loading, setLoading] = useState(false);
    const [ formValues, handleInputChange, reset ] = useForm({
    
    firstName: reservation.firstName,
    lastName: reservation.lastName,
    email: reservation.email || '',
    phone: reservation.phone || '',
    date: convertDate(reservation.date,'YYYY-MM-DD'),
    time: '',
    peopleQuantity: reservation.peopleQuantity,
    roomNumber: reservation.roomNumber,
    event: reservation.event._id,

  });

  const { event, firstName, lastName, date, peopleQuantity, roomNumber, time, email, phone} = formValues;

  useEffect(() => {

       if(list.length == 0 || list === undefined || list === null) {
        
           Swal.fire({
                title: 'No hay eventos',
                text: 'La reserva no puede ser editada ya que su evento no existe o no hay eventos.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            navigate('/dashboard/events');
       }else{
            let eventExists = list.find(ev => ev.id === event);
            
            if(eventExists){
                handleInputChange({
                    target: {
                        name: 'time',
                        value: eventExists.start
                    }
                });
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
           
       }

  } , [list]);

  useEffect(() => {
    let eventExists = list.find(ev => ev.id === event);
    if(eventExists){
        handleInputChange({
            target: {
                name: 'time',
                value: eventExists.start
            }
        });
        
    }
  } , [event]);


  const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        dispatch(removeError());
        const errors = validateReservation(formValues);
        dispatch(setError(errors));

        if(Object.keys(errors).length === 0) {

            dispatch(removeError());

            const editedReservation = {event, firstName, lastName, peopleQuantity, roomNumber, email, phone, date, time}

            dispatch(updateReservation(id,editedReservation))
            .then(response => {
                setLoading(false);
                if(response.ok) {

                    
                    Swal.fire({
                        title: 'Reserva editada',
                        text: 'La reserva se ha editado correctamente',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then(() => {
                        reset();
                        navigate('/dashboard/reservations');
                        
                        /**
                         * Si la reserva cambio de fecha:
                         */

                        //Si la fecha no es de hoy hay que sacarla
                        if(moment.utc(response.reservation.date).format('YYYY-MM-DD') !== today()){
                            
                            dispatch({
                                type:types.reservationRemove,
                                payload:response.reservation.id
                            });
                            socket.emit('remove-event-reservation', response.reservation.id, serverCallback =>{
                                console.log(serverCallback);
                            });
                        }

                        /**
                         * Si la fecha fue actualizada a hoy:
                         */
                        
                        //Si la fecha original es igual hoy no se agrega al array
                        //Si la fecha original es distinta a la actualizada y es igual a hoy se agrega

                        if(convertDate(reservation.date,'YYYY-MM-DD') !== moment.utc(response.reservation.date).format('YYYY-MM-DD')){
                            
                            if(moment.utc(response.reservation.date).format('YYYY-MM-DD') === today()){
                                dispatch({
                                    type: types.reservationAdd,
                                    payload: response.reservation
                                });
                                socket.emit('new-event-reservation', response.reservation, serverCallback =>{
                                    console.log(serverCallback);
                                });
                            }
                            
                        }

                        
                        
                        
                    });
                }else{
                    Swal.fire({
                        title: 'Error',
                        text: 'No se ha podido editar la reserva',
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    });
                }
            })
  

        }else{
            setLoading(false);
        }

        

    }   
      

  return (
    <div>
    <form onSubmit={handleSubmit} className="row g-3 animate__animated animate__fadeIn">
        <div className="form-group">
        <label htmlFor="event">Evento:</label>
            <select className="form-control" name="event" value={event} id="event" onChange={handleInputChange}>
                {
                    list.map(opt => {
                        return <option key={opt.id} value={opt.id}>{opt.title}</option>
                    })
                }
            </select>
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
            <label htmlFor="date">Fecha:</label>
            <input type="date" className="form-control" name="date" value={date} id="date" placeholder="Fecha" onChange={handleInputChange}/>
            { msgError!==null && msgError.date && <div className="alert alert-danger">{msgError.date}</div> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="time">Horario:</label>
            < input type="time" disabled className="form-control" name="time" value={time} id="time" placeholder="Horario" onChange={handleInputChange}/>
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
                Editando</button>
        }
        {

            !loading && <button type="submit" className="btn btn-reserve">Editar</button>
        }
        
    </form>
    </div>
  )
}   
