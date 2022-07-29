import React, { useEffect } from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto';
import moment from 'moment';
import { useState } from 'react';



export const EventLineChart = ({report, month}) => {


  let days = Array.from(Array(moment().month(month - 1).daysInMonth()), (_, i) => i + 1);
  const [profit, setProfit] = useState([])
  const [estimated, setEstimated] = useState([])
  const [loss, setLoss] = useState([])


  useEffect(()=>{
    let profitArray = monthArray();
    
    report.profit.map(day =>{
      profitArray[day.day -1 ] = day.total;
    });
    setProfit(profitArray);

  },[report])
  
  useEffect(()=>{
    let estimatedArray = monthArray();
    
    report.estimated.map(day =>{
      estimatedArray[day.day -1 ] = day.total;
    });
    setEstimated(estimatedArray);

  },[report])

  useEffect(()=>{
    let lossArray = monthArray();
    
    report.loss.map(day =>{
      lossArray[day.day -1 ] = day.total;
    });
    setLoss(lossArray);

  },[report])

  

  const monthArray = () => {
    let dataArray = [];
    dataArray.length = moment().daysInMonth();
    dataArray.fill(0);
    return dataArray;
  }


  return (
    <>
    <Line
            data={{
                labels: days,
                datasets: [
                  {
                    label: 'Ingresos alcanzados',
                    data: profit,
                    backgroundColor: [
                      'lime'
                    ],
                    borderColor: [
                      'green'
                    ],
                    borderWidth: 1
                  },
                  {
                    label: 'Ingresos estimados',
                    data: estimated,
                    backgroundColor: [
                      'cyan'
                    ],
                    borderColor: [
                      'blue'
                    ],
                    borderWidth: 1
                  } 
                  ,
                  {
                    label: 'Pérdidas por cancelaciones',
                    data: loss,
                    backgroundColor: [
                      'orange'
                    ],
                    borderColor: [
                      'red'
                    ],
                    borderWidth: 1
                  } 
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
