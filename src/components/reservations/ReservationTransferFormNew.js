import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm';
import { TransferReservationOtherInputs } from './TransferReservationOtherInputs';
import { TransferReservationSelect } from './TransferReservationSelect';

export const ReservationTransferFormNew = () => {

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
    console.log(transfer);

  }

  const [ formValues, handleInputChange, reset ] = useForm({
    origin: '',
    destination: '',
    price: '',
    commission: '',
    info: '',
  });

  const {origin, destination, price, commission, info } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    if(transfer === 'other'){
      console.log(formValues);
    }else{
      console.log(transferList.find(tr => tr.id === transfer));
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


        <div className="form-group col-md-12">
            <label htmlFor="info">Información adicional:</label>
            <textarea name='info' className="form-control" value={info} placeholder="Descripción" onChange={handleInputChange}></textarea>
            { msgError!==null && msgError.info && <div className="alert alert-danger">{msgError.info}</div> }
        </div>
        <button type="submit" className="btn btn-primary btn-reserve">Reservar</button>
    </form>
    </>
  )
}
