import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { reservationStatus } from '../reservations/reservationStatus';

export const EspectedIncome = () => {

  const {list, customList, transferList} = useSelector(state => state.reservations);

  const [espectedListIncome, setEspectedListIncome] = useState(0);
  const [espectedCustomListIncome, setEspectedCustomListIncome] = useState(0);
  const [espectedTransferIncome, setEspectedTransferListIncome] = useState(0);
  
  const getEspectedListIncome = (array) => {
    let income = 0;
    array.map((reservation, index) => {
       if(reservation.status !== reservationStatus.reservationCancelled){
           income = income + reservation.event.commission * reservation.peopleQuantity;
       }
    });
    return income;
  }

  const getEspectedCustomListIncome = (array) => {
    let income = 0;
    array.map((reservation, index) => {
        if(reservation.status !== reservationStatus.reservationCancelled){
            income = income + reservation.commission;
        }
    });
    return income;
  }
  
  const getEspectedTransferIncome = (array) => {
    return getEspectedCustomListIncome(array)
  }


  const getEspectedTotal = () => {
    return espectedListIncome + espectedCustomListIncome + espectedTransferIncome;
  }


  useEffect(()=>{

    setEspectedListIncome(getEspectedListIncome(list));
    
  },[list]);
  
  useEffect(()=>{

    setEspectedCustomListIncome(getEspectedCustomListIncome(customList));
    
  },[customList]);
  
  useEffect(()=>{

    setEspectedTransferListIncome(getEspectedTransferIncome(transferList));
    
  },[transferList]);





  return (
    <div className="card info-card sales-card mt-2 gold-border">
    <div className="card-body">
        <h5 className="card-title gold">Ingresos estimados</h5>

        <div className="d-flex align-items-center">
        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
            <i className={`fas fa-arrow-trend-up fa-3x gold`}></i>
        </div>
        <div className="ps-3">
            <h6>Cantidad: ${getEspectedTotal()}</h6>
            <ul>
              <li><span className="small pt-1 fw-bold">Reservas de evento</span> <span className="small pt-2 ps-1">${espectedListIncome}</span></li>
              <li><span className="small pt-1 fw-bold">Reservas personalizadas</span> <span className="small pt-2 ps-1">${espectedCustomListIncome}</span></li>
              <li><span className="small pt-1 fw-bold">Transfers</span> <span className="small pt-2 ps-1">${espectedTransferIncome}</span></li>
            </ul>
        </div>
        </div>
    </div>
    </div>
  )
}
