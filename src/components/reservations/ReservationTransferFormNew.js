import React, { useEffect, useRef, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createTransferReservation } from '../../actions/transferReservation';
import { removeError, setError } from '../../actions/ui';
import { validateTransferReservation } from '../../helpers/reservationHelper';
import { useForm } from '../../hooks/useForm';

import { InputFormDateTime } from './InputFormDateTime';
import { InputFormGuest } from './InputFormGuest';
import { InputFormPeopleAndRoomNumber } from './InputFormPeopleAndRoomNumber';
import { TransferReservationOtherInputs } from './TransferReservationOtherInputs';
import { TransferReservationSelect } from './TransferReservationSelect';

export const ReservationTransferFormNew = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const transferList = useSelector(state => state.transfers.list);

  const { msgError } = useSelector(state => state.ui);

  const otherOptions = useRef(null);

  
  const [transferValue, setTransferValue] = useState({
    transfer:'',
  });

  const {transfer} = transferValue;
  

  const handleTransferChange = ({ target }) => {
    setTransferValue({
      [target.name]: target.value
    });
    reset();
    dispatch(removeError());

  }

  const [ formValues, handleInputChange, reset ] = useForm({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    peopleQuantity: '',
    roomNumber: '',
    origin: '',
    destination: '',
    price: '',
    commission: '',
    information: '',
  });

  const { firstName, lastName, email, phone, date, time, peopleQuantity, roomNumber, origin, destination, price, commission, information } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(removeError());
    
    if(transfer === 'other'){
      
      const errors = validateTransferReservation(formValues);
      dispatch(setError(errors));

      if(Object.keys(errors).length === 0) {
        dispatch(createTransferReservation({...formValues, transfer:null}))
        .then(response => {
          setLoading(false);
          if(response) {

              Swal.fire({
                  title: 'Transfer creado',
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

    }else{
      const selectedTransfer = transferList.find(ev => ev.id === transfer);
      
      const objToValidate = {
        ...formValues,
        origin: selectedTransfer.origin,
        destination: selectedTransfer.destination,
        price: selectedTransfer.price,
        commission: selectedTransfer.commission,
        transfer: selectedTransfer.id,
      }
      const objErrors = validateTransferReservation(objToValidate);

      dispatch(setError(objErrors));

      if(Object.keys(objErrors).length === 0){
        dispatch(createTransferReservation(objToValidate))
        .then(response => {
          setLoading(false);
          if(response) {

              Swal.fire({
                  title: 'Transfer creado',
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

    

  }

  useEffect(() => {
    if(transferList.length > 0) {

      setTransferValue({
        ...transfer,
        transfer: transferList[0].id
      });


    }else{
      setTransferValue({
        ...transfer,
        transfer: 'other'
      });
    }
  } , []);


  return (
    <>
    <form onSubmit={handleSubmit} className="row g-3 animate__animated animate__fadeIn">
        {
          transferList.length > 0 &&
          <TransferReservationSelect
            handleTransferChange={handleTransferChange}
            transfer={transfer}
            transferList={transferList}
            otherOptions={otherOptions}
          />
        }

        {
          transfer === 'other' &&
          <TransferReservationOtherInputs
            handleInputChange={handleInputChange}
            origin={origin}
            destination={destination}
            price={price}
            commission={commission}
            className="animate__animated animate__fadeIn"
          />
          
        }

        <InputFormGuest
            firstName={firstName}
            lastName={lastName}
            email={email}
            phone={phone}
            handleInputChange={handleInputChange}
        />
        <InputFormDateTime
            date={date}
            time={time}
            handleInputChange={handleInputChange}
        />
        <InputFormPeopleAndRoomNumber
            peopleQuantity={peopleQuantity}
            roomNumber={roomNumber}
            handleInputChange={handleInputChange}
        />
        
        <div className="form-group col-md-12">
            <label htmlFor="info">Información adicional:</label>
            <textarea name='information' className="form-control" value={information} placeholder="Información adicional" onChange={handleInputChange}></textarea>
            {msgError !== null && msgError.information && <small className="form-text text-danger">{msgError.information}</small>}
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
                Reservando transfer</button>
        }
        {

            !loading && <button type="submit" className="btn btn-reserve">Reservar transfer</button>
        }
    </form>
    </>
  )
}
