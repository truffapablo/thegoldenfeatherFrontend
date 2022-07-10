import React from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto';
import { LineChart } from './LineChart';


export const ReportView = () => {

  return (
    
    <div className='container-fluid px-4 custom-view'>
      <div className='row mt-5'>
      <h1>Reportes</h1>
      <div className='col-md-12'>
        <h2>Julio 2022</h2>
        <div id='line-chart-box'>
          <LineChart/>
        </div>
        <h3>Próximamente</h3>
        <ul>
          <li>Reportes por fecha.</li>
          <li>Reportes por mes.</li>
          <li>Reportes por usuarios.</li>
          <li>Reportes de ventas.</li>
          <li>Reportes de comisiones.</li>
        </ul>
      </div>
      </div>
    </div>
  )
}
