import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { updateReservation } from '../../actions/reservation';

import { removeError, setError} from '../../actions/ui';
import { validateReservation } from '../../helpers/reservationHelper';
import { useForm } from '../../hooks/useForm';
import { convertDate } from '../../helpers/convertDate';
export const ReservationFormEdit = () => {
    const { msgError } = useSelector(state => state.ui);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {list} = useSelector(state => state.events);
    const [evId, setEvId] = useState(list[0].id);
    const reList  = useSelector(state => state.reservations);
    const {id} = useParams();

    const reservation = reList.list.find(reservation => reservation.id === id);
    const [eventTime, setEventTime] = useState('');

    const [ formValues, handleInputChange, reset ] = useForm({
    
    firstName: reservation.firstName,
    lastName: reservation.lastName,
    email: reservation.email || '',
    phone: reservation.phone || '',
    date: convertDate(reservation.date,'YYYY-MM-DD'),
    time: reservation.time,
    peopleQuantity: reservation.peopleQuantity,
    roomNumber: reservation.roomNumber,
    event: reservation.event._id,

  });

  const { event, firstName, lastName, date, peopleQuantity, roomNumber, time, email, phone} = formValues;

  useEffect(() => {
      setEventTime(list.find(ev => ev.id === event).start);
      handleInputChange({
        target: {
            name: 'time',
            value: list.find(ev => ev.id === event).start
        }
    });
  } , [event]);


  const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValues);
        dispatch(removeError());
        const errors = validateReservation(formValues);
        dispatch(setError(errors));
        
        if(Object.keys(errors).length === 0) {

            dispatch(removeError());

            const editedReservation = {
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
            dispatch(updateReservation(id,editedReservation))
            .then(response => {
                if(response) {

                    Swal.fire({
                        title: 'Reserva editada',
                        text: 'La reserva se ha editado correctamente',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then(() => {
                        reset();
                        navigate('/dashboard/reservations');
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
            console.log(errors);
        }

        

    }   
      

  return (

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
        <button type="submit" className="btn btn-primary btn-reserve">Editar</button>
        
    </form>
  )
}   
