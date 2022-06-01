import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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

  const dispatch = useDispatch();

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
    firstName: 'Pablo',
    lastName: 'Truffa',
    email: 'pablotruffa@email.com',
    phone: '',
    date: '2022-10-10',
    time: '14:00',
    peopleQuantity: '2',
    roomNumber: '100',
    origin: 'La Plata',
    destination: 'Berazategui',
    price: '3000',
    commission: '300',
    information: 'Llevan equipaje de mano',
  });

  const { firstName, lastName, email, phone, date, time, peopleQuantity, roomNumber, origin, destination, price, commission, information } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
  
    dispatch(removeError());
    
    if(transfer === 'other'){
      
      const errors = validateTransferReservation(formValues);
      dispatch(setError(errors));
      console.log(Object.keys(errors));
      if(Object.keys(errors).length === 0) {
        console.log('a validar...',formValues);
        return 
        dispatch(createTransferReservation(formValues));
      }

    }else{
      const selectedTransfer = transferList.find(ev => ev.id === transfer);
      
      const objToValidate = {
        ...formValues,
        origin: selectedTransfer.origin,
        destination: selectedTransfer.destination,
        price: selectedTransfer.price,
        commission: selectedTransfer.commission,
      }
      

      const objErrors = validateTransferReservation(objToValidate);

      dispatch(setError(objErrors));

      if(Object.keys(objErrors).length === 0){
        dispatch(createTransferReservation(objToValidate))
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
        <button type="submit" className="btn btn-primary btn-reserve">Reservar Transfer</button>
    </form>
    </>
  )
}
