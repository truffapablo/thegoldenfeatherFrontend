import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { ReservationTableList } from './ReservationTableList';

export const ReservationList = () => {
  
  const { list, customList } = useSelector(state => state.reservations);

  return (
      <>
        <ReservationTableList 
            list={list}
            customList={customList}
        />
      </>
    
  )
}
