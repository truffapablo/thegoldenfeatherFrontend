import React, { useEffect } from 'react'
import { ReservationTableList } from './ReservationTableList';
import { TransferReservationTableList } from './TransferReservationTableList';

export const ReservationList = () => {
  
  return (
      <>
        <ReservationTableList />
        <TransferReservationTableList />
      </>
    
  )
}
