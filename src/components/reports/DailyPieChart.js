import React from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto';

export const DailyPieChart = ({reservation_quantity}) => {
    const {custom, event, transfer} = reservation_quantity;
  return (
    <div>
        <Pie
            data={{
                labels: ['Reservas de Evento','Reservas Personalizadas','Transfers'],
                datasets: [{
                    data: [event, custom, transfer],
                    backgroundColor: [
                        '#263032',
                        '#C59B5F',
                        '#e3a040'
                    ],
                    hoverBackgroundColor: [
                        '#263032',
                        '#C59B5F',
                        '#e3a040'
                    ]
                }]
            }}
            options={{
                title: {
                    display: true,
                    text: 'Reservaciones',
                    fontSize: 20
                },
                legend: {
                    display: true,
                    position: 'left'
                },
                
            }}
            
        />
    </div>
  )
}
