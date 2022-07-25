import moment from 'moment';
import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays, getDay, subDays} from "date-fns";
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';
import { today } from '../../helpers/today';
import { types } from '../../types/types';
import socket from '../../sockets/config';

import { convertDate } from '../../helpers/convertDate';
import { updateReservation } from '../../actions/reservation';
import { removeError, setError} from '../../actions/ui';
import { validateReservation } from '../../helpers/reservationHelper';
import { useForm } from '../../hooks/useForm';
import { SelectEvent } from './SelectEvent';
export const ReservationFormEdit = () => {
  
    const {id} = useParams();
    const navigate = useNavigate();
    const { msgError } = useSelector(state => state.ui);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {list} = useSelector(state => state.events);
    const {advanceSearch}       = useSelector(state => state.search);
    const reList = useSelector(state => state.reservations);
    
    const reservation = reList.list.find(reservation => reservation.id === id) || advanceSearch.data.find(reservation => reservation.id === id);
    
    const [ formValues, handleInputChange, reset ] = useForm({
        firstName: reservation.firstName,
        lastName: reservation.lastName,
        email: reservation.email,
        phone: reservation.phone || '',
        peopleQuantity: reservation.peopleQuantity,
        roomNumber: reservation.roomNumber,
    });

    

    const {firstName, lastName, peopleQuantity, roomNumber, email, phone} = formValues;

    const [date, setDate] = useState(convertDate(reservation.date,'YYYY-MM-DD'))
    const [time, setTime] = useState(reservation.time)
    const [event, setEvent] = useState(reservation.event._id)

    const [availableDates, setAvailableDates] = useState([0,1,2,3,4,5,6]);


    const [disableDate, setDisableDate] = useState(false);


    useEffect(()=>{

    if(list.length === 0 || list === undefined || list === null){
        return <Navigate to="/"/>
    }

    if(id){
        const eventByParamsId = list.find(event => event.id === id);
        if(eventByParamsId){

            setEvent(eventByParamsId.id)

            setTime(eventByParamsId.start)
        
            if(eventByParamsId.date){
                setDate(moment.utc(eventByParamsId.date).format('YYYY-MM-DD'))
                setDisableDate(true)
                setAvailableDates([0,1,2,3,4,5,6]);
            }else{
                setDate('')
                setDisableDate(false)
                setAvailableDates(eventByParamsId.schedule);
            }
        }

    }else{
        setEvent(list[0].id);

        setTime(list[0].start)

        if(list[0].date){
            setDate(moment.utc(list[0].date).format('YYYY-MM-DD'))
            setDisableDate(true)
            setAvailableDates([0,1,2,3,4,5,6]);
        }else{
            setAvailableDates(list[0].schedule);
        }
    }

},[])

useEffect(()=>{
    
    const eventChange = list.find(item => item.id === event)
    if(eventChange){
        setTime(eventChange.start)
        
        if(eventChange.date){
            setDate(moment.utc(eventChange.date).format('YYYY-MM-DD'))
            setDisableDate(true);
            setAvailableDates([0,1,2,3,4,5,6]);
        }else{
            setDate('')
            setDisableDate(false);
            setAvailableDates(eventChange.schedule);
        }
    }
},[event])


    const handleSubmit = (e) => {
        e.preventDefault();
        //setLoading(true)
        dispatch(removeError());
        const errors = validateReservation({
            ...formValues,
            date:moment.utc(date).format('YYYY-MM-DD'),
            time,
            event
        });
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
                date:moment.utc(date).format('YYYY-MM-DD'),
                time
            }
            
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
                    console.log(response);
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
    
    const isWeekday = (date) => {
        
        const day = getDay(date);
        let copyAvailableDates = [];
        availableDates.map(item => {
            copyAvailableDates.push(parseInt(item))
        });
        return copyAvailableDates.includes(day);
       
    };


    const setCalendarDate = (date) => {
        setDate(moment.utc(date).subtract(1,'day').format('YYYY-MM-DD'));
        setStartDate(date)
    }

    const [startDate, setStartDate] = useState(new Date(moment.utc(reservation.date).add(1, 'day').format('YYYY-MM-DD')));
    
  return (

    <form onSubmit={handleSubmit} className="row g-3 animate__animated animate__fadeIn">
        <div className="form-group">
        <label htmlFor="event">Evento:</label>
            <SelectEvent 
                event={event}
                list={list}
                setEvent={setEvent}
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
        {
            disableDate &&
            <div className="form-group col-md-6">
            <label htmlFor="date">Fecha</label>
            <input 
            type="date" 
            className="form-control" 
            name="date" 
            value={date} 
            id="date" 
            placeholder="Fecha" 
            disabled
            />
            </div>
        }{
            !disableDate &&
            <div className="form-group col-md-6 animate__animated animate__fadeIn">
                <label htmlFor="date">Fecha</label>
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setCalendarDate(date)} 
                    minDate={subDays(new Date(), 0)}
                    filterDate={isWeekday}
                    inline
                />
                { msgError!==null && msgError.date && <small className="form-text text-danger">{msgError.date}</small> }
            </div>
        }
        <div className="form-group col-md-6">
            <label htmlFor="time">Horario</label>
            <input type="time" disabled className="form-control" name="time" value={time} id="time" placeholder="Horario" onChange={(e)=>{setTime(e.target.value)}}/>
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
  )
}   
