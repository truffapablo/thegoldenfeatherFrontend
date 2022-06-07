import React from 'react'
import { Bar, Pie } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto';
import { useSelector } from 'react-redux';
import { convertDate } from '../../helpers/convertDate';

export const ReservationChart = () => {

  const {list, customList, transferList} = useSelector(state => state.reservations);

  return (
    <div>
        <Pie
            data={{
                labels: ['Reservas de Evento','Reservas Personalizadas','Transfers'],
                datasets: [{
                    data: [list.length, customList.length, transferList.length],
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
                    display: false,
                    position: 'right'
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0
                    }
                },
                tooltips: {
                    enabled: true
                },
                maintainAspectRatio: false,
                responsive: true,
            }}
            
        />
    </div>
  )
}
