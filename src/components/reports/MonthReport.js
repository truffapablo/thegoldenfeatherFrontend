import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { Bar, Line, Pie } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto';
import { useDispatch } from 'react-redux';
import { getMonthReport } from '../../actions/reports';
import { EventLineChart } from './EventLineChart';
import { MonthReservationsByType } from './MonthReservationsByType';
import { MonthReservationsRevenue } from './MonthReservationsRevenue';
export const MonthReport = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [month, setMonth] = useState(moment.utc().format('M'));
    const [report, setReport] = useState([])
    
    useEffect(()=>{
        setLoading(true);
        dispatch(getMonthReport({month}))
        .then(data => {
            setLoading(false);
            console.log(data);
            setReport(data);
        })
    },[])
  return (
    <div className="row g-3 animate__animated animate__fadeIn mt-2">
        <div className='row'>
            <div className='col col-sm-12'>
                {loading?<h2>Cargando reporte...</h2>: <h2>Reporte mensual - {moment().format('[Mes de ] MMMM')}</h2>}
            </div>
        </div>
        
        <div className='row'>
            <div className='col col-sm-6'>
                {
                report && report.length !==0 &&
                <>
                    <MonthReservationsByType
                    length={report.length}
                    />
                </>
                }
            </div>
            <div className='col col-sm-6'>
                {
                report && report.length !==0 &&
                <>
                    <MonthReservationsRevenue
                    title={'Ingresos del mes'}
                    revenue={report.revenue_overview.profit}
                    />
                </>
                }
            </div>
        </div>
        <div className='row'>
                <div className='col col-sm-12 col-md-6'>
                    {
                        report && report.length !==0 &&
                        <>
                        <h5 className='mb-3 mt-3'>Reservas de evento.</h5>
                        <EventLineChart
                        report={report.revenue_detail.event}
                        />
                        </>
                    }
                </div>
                <div className='col col-sm-12 col-md-6'>
                    {
                        report && report.length !==0 &&
                        <>
                        <h5 className='mb-3 mt-3'>Reservas personalizadas.</h5>
                        <EventLineChart
                        report={report.revenue_detail.custom}
                        />
                        </>
                    }
                </div>
                <div className='col col-sm-12 col-md-12'>
                    {
                        report && report.length !==0 &&
                        <>
                        <h5 className='mb-3 mt-3'>Reservas de transfer.</h5>
                        <EventLineChart
                        report={report.revenue_detail.transfer}
                        />
                        </>
                    }
                </div>
        </div>
            {/* <div className='col'>
                {
                report && report.length !==0 &&
                <div className='row'>
                    <div className='col'>

                    <h5 className='mb-3 mt-3'>Reservas de evento.</h5>
                    <EventLineChart
                        report={report.revenue_detail.event}
                        />
                    </div>
                    <div className='col'>

                    <h5 className='mb-3 mt-3'>Reservas personalizadas.</h5>
                    <EventLineChart
                        report={report.revenue_detail.custom}
                        />
                    </div>
                    
                    <div className='col'>
                    
                    <h5 className='mb-3 mt-3'>Reservas de transfer.</h5>
                    <EventLineChart
                        report={report.revenue_detail.transfer}
                        />
                    </div>
                </div>
                }
            </div> */}
        
    </div>
  )
}
