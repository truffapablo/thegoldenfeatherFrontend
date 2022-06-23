import React, { useEffect, useRef, useState } from 'react'
import moment from 'moment';
import { today } from '../../helpers/today';
import { types } from '../../types/types';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createTransferReservation, editTransferReservation } from '../../actions/transferReservation';
import { removeError, setError } from '../../actions/ui';
import { convertDate } from '../../helpers/convertDate';
import { validateTransferReservation } from '../../helpers/reservationHelper';
import { useForm } from '../../hooks/useForm';
import { InputFormDateTime } from './InputFormDateTime';
import { InputFormGuest } from './InputFormGuest';
import { InputFormPeopleAndRoomNumber } from './InputFormPeopleAndRoomNumber';
import { TransferReservationOtherInputs } from './TransferReservationOtherInputs';
import { TransferReservationSelect } from './TransferReservationSelect';

export const ReservationTransferFormEdit = () => {

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const transferList = useSelector(state => state.transfers.list);
  const transferReservationList = useSelector(state => state.reservations.transferList);
  const {advanceSearch} = useSelector(state => state.search);
  const {id} = useParams();

  const transferR = transferReservationList.find(transferReservation => transferReservation.id === id) || advanceSearch.data.find(transferReservation => transferReservation.id === id);

  const { msgError } = useSelector(state => state.ui);

  const otherOptions = useRef(null);

  
  const [transferValue, setTransferValue] = useState({
    transfer: '',
  });

  const {transfer} = transferValue;
  

  const handleTransferChange = ({ target }) => {
    setTransferValue({
      [target.name]: target.value
    });
    console.log(transferValue);
    reset();
    dispatch(removeError());

  }

  const [ formValues, handleInputChange, reset ] = useForm({
    firstName: transferR.firstName,
    lastName: transferR.lastName,
    email: transferR.email || '',
    phone: transferR.phone || '',
    date: convertDate(transferR.date,'YYYY-MM-DD'),
    time: transferR.time,
    peopleQuantity: transferR.peopleQuantity,
    roomNumber: transferR.roomNumber,
    origin: transferR.origin,
    destination: transferR.destination,
    price: transferR.price,
    commission: transferR.commission,
    information: transferR.information,
  });

  const { firstName, lastName, email, phone, date, time, peopleQuantity, roomNumber, origin, destination, price, commission, information } = formValues;


  useEffect(() => {

    if(transferR.transfer){

      //Buscar si existe el transfer
      const trasferInList = transferList.find(transfer => transfer.id === transferR.transfer);
      
      //Si todavia existe el transfer en la lista lo seteamos
      if (trasferInList) {
        setTransferValue({
          transfer: trasferInList.id
        });
      }else{
        //Si no existe el transfer lo seteamos como otro
        setTransferValue({
          transfer: 'other'
        });
      }
    }else{
        
        setTransferValue({
          transfer: 'other'
        });
    }


  } , []);



  const handleSubmit = (e) => {
    e.preventDefault();
  
    dispatch(removeError());
    
    if(transfer === 'other'){
      
      const errors = validateTransferReservation(formValues);
      dispatch(setError(errors));

      if(Object.keys(errors).length === 0) {  
        dispatch(editTransferReservation(id, {...formValues, transfer:null}))
        .then(response => {
          if(response.ok) {
      
              Swal.fire({
                  title: 'Transfer editado',
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
                        if(moment.utc(response.transferR.date).format('YYYY-MM-DD') !== today()){
                          console.log('REMOVE');
                          console.log('RESPONSE',response);
                          dispatch({
                              type:types.transferReservationRemove,
                              payload:response.transferR.id
                          });
                      }

                      /**
                       * Si la fecha fue actualizada a hoy:
                       */
                      
                      //Si la fecha original es igual hoy no se agrega al array
                      //Si la fecha original es distinta a la actualizada y es igual a hoy se agrega

                      if(convertDate(transferR.date,'YYYY-MM-DD') !== moment.utc(response.transferR.date).format('YYYY-MM-DD')){
                          
                          if(moment.utc(response.transferR.date).format('YYYY-MM-DD') === today()){
                              dispatch({
                                  type: types.transferReservationAdd,
                                  payload: response.transferR
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
      }

    }else{
      const selectedTransfer = transferList.find(ev => ev.id === transfer);
      
      const objToValidate = {
        ...formValues,
        origin: selectedTransfer.origin,
        destination: selectedTransfer.destination,
        price: selectedTransfer.price,
        commission: selectedTransfer.commission,
        transfer: selectedTransfer.id
      }
      

      const objErrors = validateTransferReservation(objToValidate);

      dispatch(setError(objErrors));

      if(Object.keys(objErrors).length === 0){
        dispatch(editTransferReservation(id, objToValidate))
        .then(response => {
          if(response.ok) {

              Swal.fire({
                title: 'Transfer editado',
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
                        if(moment.utc(response.transferR.date).format('YYYY-MM-DD') !== today()){
                          console.log('REMOVE');
                          console.log('RESPONSE',response);
                          dispatch({
                              type:types.transferReservationRemove,
                              payload:response.transferR.id
                          });
                      }

                      /**
                       * Si la fecha fue actualizada a hoy:
                       */
                      
                      //Si la fecha original es igual hoy no se agrega al array
                      //Si la fecha original es distinta a la actualizada y es igual a hoy se agrega

                      if(convertDate(transferR.date,'YYYY-MM-DD') !== moment.utc(response.transferR.date).format('YYYY-MM-DD')){
                          
                          if(moment.utc(response.transferR.date).format('YYYY-MM-DD') === today()){
                              dispatch({
                                  type: types.transferReservationAdd,
                                  payload: response.transferR
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
      } 
    }

    

  }

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
        <button type="submit" className="btn btn-primary btn-reserve">Editar Transfer</button>
    </form>
    </>
  )
}
