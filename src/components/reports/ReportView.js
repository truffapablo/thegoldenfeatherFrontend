import React from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto';
import { useSelector } from 'react-redux';


export const ReportView = () => {

  const {list, customList, transferList} = useSelector(state => state.reservations);
  return (
    
    <div className='container-fluid px-4 custom-view'>
      <div className='row mt-5'>
      <h1>Reportes</h1>
      <div className='col-md-12'>
        <h2>Próximamente</h2>
        
      </div>
      </div>
    </div>
  )
}
