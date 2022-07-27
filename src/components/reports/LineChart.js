import React from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto';
import moment from 'moment';



export const LineChart = (month) => {

  let box = Array.from(Array(moment().daysInMonth()), (_, i) => i + 1)

    console.log(box);
  return (
    <>
    <Line
            data={{
                labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
                datasets: [
                  {
                  label: 'Reservas de Evento',
                  data: [1, 5, 8, 10, 3, 2, 11, 22, 10, 18, 12, 13, 15, 17],
                  backgroundColor: [
                    'cyan'
                  ],
                  borderColor: [
                    'blue'
                  ],
                  borderWidth: 1
                },
                  {
                  label: 'Reservas de Transfers',
                  data: [10, 15, 18, 10, 6, 9, 14, 7, 6, 14],
                  backgroundColor: [
                    'yellow'
                  ],
                  borderColor: [
                    'red'
                  ],
                  borderWidth: 1
                },
                  {
                  label: 'Reservas Personalizadas',
                  data: [2, 4, 8, 9, 7, 5, 8, 2, 2, 1],
                  backgroundColor: [
                    'lime'
                  ],
                  borderColor: [
                    'green'
                  ],
                  borderWidth: 1
                },
              
              ]
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
                scales:{
                  y:{
                    beginAtZero:true
                  }
                }
            }}
            
        />
    </>
  )
}
