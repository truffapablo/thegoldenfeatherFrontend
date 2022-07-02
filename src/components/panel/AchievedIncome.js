import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { reservationStatus } from '../reservations/reservationStatus';

export const AchievedIncome = () => {

    const {list, customList, transferList} = useSelector(state => state.reservations);
    
    const [achievedListIncome, setAchievedListIncome] = useState(0);
    const [achievedCustomListIncome, setAchievedCustomListIncome] = useState(0);
    const [achievedTransferIncome, setAchievedTransferListIncome] = useState(0);

    const getAchievedListIncome = (array) => {
        let income = 0;
        array.map((reservation, index) => {
           if(reservation.status === reservationStatus.reservationCompleted){
               income = income + reservation.event.commission * reservation.peopleQuantity;
           }
        });
        return income;
      }

    const getAchievedCustomListIncome = (array) => {
        let income = 0;
        array.map((reservation, index) => {
            if(reservation.status === reservationStatus.reservationCompleted){
                income = income + reservation.commission;
            }
        });
        return income;
    }
    
    const getAchievedTransferIncome = (array) => {
        return getAchievedCustomListIncome(array)
    }

    const getAchievedTotal = () => {
        return achievedListIncome + achievedCustomListIncome + achievedTransferIncome;
      }

    useEffect(()=>{
        setAchievedListIncome(getAchievedCustomListIncome(list));
    },[list]);

    useEffect(()=>{
        setAchievedCustomListIncome(getAchievedCustomListIncome(customList));
    },[customList]);

    useEffect(()=>{
        setAchievedTransferListIncome(getAchievedTransferIncome(transferList));
    },[transferList]);
   

    
  
    return (
    <div className="card info-card sales-card mt-2 gold-border">
    <div className="card-body">
        <h5 className="card-title gold">Ingresos alcanzados</h5>

        <div className="d-flex align-items-center">
        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
            <i className="fa-solid fa-sack-dollar fa-3x gold"></i>
        </div>
        <div className="ps-3">
            <h6>Cantidad: ${getAchievedTotal()}</h6>
            <ul>
              <li><span className="small pt-1 fw-bold">Reservas de evento</span> <span className="small pt-2 ps-1">${achievedListIncome}</span></li>
              <li><span className="small pt-1 fw-bold">Reservas personalizadas</span> <span className="small pt-2 ps-1">${achievedCustomListIncome}</span></li>
              <li><span className="small pt-1 fw-bold">Transfers</span> <span className="small pt-2 ps-1">${achievedTransferIncome}</span></li>
            </ul>
            
            

        </div>
        </div>
    </div>
    </div>
  )
}
