import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { startCustomReservation } from '../../actions/customReservation';
import { removeError, setError} from '../../actions/ui';
import { validateCustomReservation } from '../../helpers/customReservation';
import { useForm } from '../../hooks/useForm';
import { InputFormDataReservation } from './InputFormDataReservation';
import { InputFormDateTime } from './InputFormDateTime';
import { InputFormGuest } from './InputFormGuest';
import { InputFormPeopleAndRoomNumber } from './InputFormPeopleAndRoomNumber';
import { InputFormPriceAndCommision } from './InputFormPriceAndCommision';

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
    commission: '0',
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
        <InputFormDataReservation
            formValues={formValues}
            handleInputChange={handleInputChange}  
        />
        <button type="submit" className="btn btn-primary btn-reserve">Reservar</button>
        
    </form>
  )
}   
