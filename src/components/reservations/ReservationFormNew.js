import moment from 'moment';
import React, { useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

import { startNewReservation } from '../../actions/reservation';
import { removeError, setError} from '../../actions/ui';
import { validateReservation } from '../../helpers/reservationHelper';
import { useForm } from '../../hooks/useForm';
import { SelectEvent } from './SelectEvent';
export const ReservationFormNew = () => {
  
    const {id} = useParams();
    const navigate = useNavigate();
    const { msgError } = useSelector(state => state.ui);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const {list} = useSelector(state => state.events);
  
const [ formValues, handleInputChange, reset ] = useForm({
    firstName: '',
    lastName: '',
    email:'',
    phone: '',
    peopleQuantity: '',
    roomNumber: '',
  });

  

const {firstName, lastName, peopleQuantity, roomNumber, email, phone} = formValues;

const [date, setDate] = useState('')
const [time, setTime] = useState('')
const [event, setEvent] = useState('')


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
            }else{
                setDate('')
                setDisableDate(false)
            }
        }

    }else{
        
        setEvent(list[0].id);

        setTime(list[0].start)
        if(list[0].date){
            setDate(moment.utc(list[0].date).format('YYYY-MM-DD'))
            setDisableDate(true)
        }
    }

},[])

useEffect(()=>{
    
    const eventChange = list.find(item => item.id === event)
    if(eventChange){
        setTime(eventChange.start)
        
        if(eventChange.date){
            setDate(moment.utc(eventChange.date).format('YYYY-MM-DD'))
            setDisableDate(true)
        }else{
            setDate('')
            setDisableDate(false)
        }
    }
},[event])


  


    const handleSubmit = (e) => {
        e.preventDefault();
        
        setLoading(true)
        
        dispatch(removeError());
        const errors = validateReservation({
            ...formValues,
            date,
            time,
            event
        });
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
                setLoading(false);
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
            

        }else{
            setLoading(false);
        }

        

    }   

    const changeDate = (e) =>  {
        const eventChange = list.find(item => item.id === event)
        if(eventChange.schedule){
            const selectedDay = moment.utc(e.target.value).day()
            if(eventChange.schedule.includes(selectedDay)){
                alert('No podes elegir esa fecha')
            }else{
                setDate(e.target.value)
            }

        }else{
            setDate(e.target.value)
        }
    }
      
    const [startDate, setStartDate] = useState(new Date());
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
        <div className="form-group col-md-6">
            <label htmlFor="date">Fecha</label>
            <input 
            type="date" 
            className="form-control" 
            name="date" 
            value={date} 
            id="date" 
            placeholder="Fecha" 
            disabled={disableDate}
            onChange={(e)=>{changeDate(e)}}
            
            />
            {/* <DatePicker 
                selected={startDate} 
                onChange={(date:Date) => setStartDate(date)} 
                excludeDates={[addDays(new Date(),3)]}
                
                
                /> */}
            { msgError!==null && msgError.date && <small className="form-text text-danger">{msgError.date}</small> }
        </div>
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
                Reservando</button>
        }
        {

            !loading && <button type="submit" className="btn btn-reserve">Reservar</button>
        }
        
    </form>
  )
}   
