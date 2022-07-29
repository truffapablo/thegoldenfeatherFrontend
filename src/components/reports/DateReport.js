import React, { useEffect } from 'react'
import moment from 'moment';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getReportByDate } from '../../actions/reports';
import { ReservationByStatus } from './ReservationByStatus';
import { ReservationByType } from './ReservationByType';
import { ReservationsRevenue } from './ReservationsRevenue';
import { DailyPieChart } from './DailyPieChart';
export const DateReport = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState([])
    const [date, setDate] = useState(moment().format('DD-MM-YYYY'));
    
    useEffect(()=>{
        setLoading(true);

        dispatch(getReportByDate({
            from:moment().format('YYYY-MM-DD'),
            to:moment().format('YYYY-MM-DD'),
        }))
        .then(data => {
            setLoading(false);
            console.log(data);
            setReport(data);
        })
    },[])
  
  const getReport = (date) => {
        setLoading(true);
        setDate(moment(date).format('DD-MM-YYYY'));
        dispatch(getReportByDate({
            from:date,
            to:date,
        }))
        .then(data => {
            setLoading(false);
            console.log(data);
            setReport(data);
        })
  }

  return (
    <div className="row g-3 animate__animated animate__fadeIn mt-2">
        <div className='row'>
            <div className='col col-sm-12'>
                {loading?<h2>Cargando reporte...</h2>: <h2 className='animate__animated animate__fadeIn'>Reporte por fecha {date}</h2>}
            </div>
            <div className='col col-sm-6'>
            <label htmlFor="selectDate">Seleccioná la fecha del reporte.</label>
            <input type="date" className="form-control" id="selectDate" onChange={(e)=>{getReport(e.target.value)}}/>
            </div>
            
        </div>
        <div className='row'>
        
            <div className='col col-sm-12 col-md-6'>
                <div className='row'>
                    <div className='col col-sm-12'>
                        {
                        report && report.length !== 0 &&
                        <>
                        <ReservationByType
                        quantity={report.reservation_quantity}
                        />
                        <ReservationByStatus
                        status={report.reservation_status}
                        />
                        </>
                        }
                    </div>
                    <div className='col col-sm-12'>

                    </div>
                </div>
            </div>
                
            <div className='col col-sm-12 col-md-4'>
            {
            report && report.length !== 0 &&
            <>
            <DailyPieChart
                reservation_quantity={report.reservation_quantity}
            />
            </>
            }
            </div>

        </div>

        <div className='row'>
            {   
                report && report.length !== 0 &&
                <>
                <div className='col col-sm-12 col-md-4'>
                    
                    <ReservationsRevenue
                    total={true}
                    title={'Ingresos alcanzados'}
                    revenue={report.revenue.profit}
                    />
                </div>
                </>
            }
            {   
                report && report.length !== 0 &&
                <>
                    <div className='col col-sm-12 col-md-4'>
                    <ReservationsRevenue
                    total={true}
                    title={'Ingresos estimados'}
                    revenue={report.revenue.estimated_profit}
                    />
                    </div>
                </>
            }
            {   
                report && report.length !== 0 &&
                <>
                    <div className='col col-sm-12 col-md-4'>
                    <ReservationsRevenue
                    total={true}
                    title={'Pérdidas por cancelaciones'}
                    revenue={report.revenue.economic_loss}
                    />
                    </div>
                </>
            }
        </div>


    </div>
)
        
  
}
