import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { reservationStatus } from '../reservations/reservationStatus';

export const AchievedIncome = () => {

    const {list, customList, transferList} = useSelector(state => state.reservations);
  
    const [espectedIncome, setEspectedIncome] = React.useState({
        total: 0,
        eventReservation: 0,
        customReservation: 0,
        transferReservation: 0,
    });

    const { total, customReservation, transferReservation, eventReservation } = espectedIncome;
    
    const getIncome = (array) => {
    
        array.map(reservations => {
            reservations.map(reservationType => {
                if(reservationType.status === reservationStatus.reservationCompleted){
                    
                    if(reservationType.pattern === 'EVENT_RESERVATION'){
                        setEspectedIncome({
                            ...espectedIncome,
                            eventReservation: (espectedIncome.eventReservation += reservationType.event.commission) * reservationType.peopleQuantity
                        });
                        
                    }else if (reservationType.pattern === 'CUSTOM_RESERVATION'){
                        setEspectedIncome({
                            ...espectedIncome,
                            customReservation: espectedIncome.customReservation += reservationType.commission
                        });
                    }else if (reservationType.pattern === 'TRANSFER_RESERVATION'){
                        setEspectedIncome({
                            ...espectedIncome,
                            transferReservation: espectedIncome.transferReservation += reservationType.commission
                        });
                      
                    }
                }
            })
        });
    
        setEspectedIncome({
            ...espectedIncome,
            total: espectedIncome.total += (espectedIncome.eventReservation + espectedIncome.customReservation + espectedIncome.transferReservation)
        });
    
      }

      useEffect(() => {
        getIncome([list, customList, transferList]);
         
     } , [list, customList, transferList]);
  
    return (
    <div className="card info-card sales-card mt-2">
    <div className="card-body">
        <h5 className="card-title">Ingresos alcanzados</h5>

        <div className="d-flex align-items-center">
        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
            <i className="fa-solid fa-sack-dollar fa-3x"></i>
        </div>
        <div className="ps-3">
            <h6>Cantidad: ${total}</h6>
            <ul>
              <li><span className="text-success small pt-1 fw-bold">Reservas de evento</span> <span className="text-muted small pt-2 ps-1">${eventReservation}</span></li>
              <li><span className="text-success small pt-1 fw-bold">Reservas personalizadas</span> <span className="text-muted small pt-2 ps-1">${customReservation}</span></li>
              <li><span className="text-success small pt-1 fw-bold">Transfers</span> <span className="text-muted small pt-2 ps-1">${transferReservation}</span></li>
            </ul>
            
            

        </div>
        </div>
    </div>
    </div>
  )
}
