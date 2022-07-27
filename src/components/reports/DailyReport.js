import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDailyReport } from '../../actions/reports';
import { ReservationByStatus } from './ReservationByStatus';
import { ReservationByType } from './ReservationByType';
import { ReservationsRevenue } from './ReservationsRevenue';

export const DailyReport = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState([])
    
    useEffect(()=>{
        setLoading(true);
        dispatch(getDailyReport())
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
                {loading?<h2>Cargando reporte...</h2>: <h2>Reporte diario.</h2>}
            </div>
        </div>
        <div className='row'>
            {
                report && report.length !== 0 &&
            <>
                <div className='col col-sm-12'>
                <ReservationByType
                    quantity={report.reservation_quantity}
                />
                <ReservationByStatus
                    status={report.reservation_status}
                />
                </div>
            </>
            }
            {   
                report && report.length !== 0 &&
                <>
                    <div className='col col-sm-12'>
                    <ReservationsRevenue
                    title={'Ingresos alcanzados'}
                    revenue={report.revenue.profit}
                    />
                    </div>
                </>
            }
            {   
                report && report.length !== 0 &&
                <>
                    <div className='col col-sm-12'>
                    <ReservationsRevenue
                    title={'Ingresos estimados'}
                    revenue={report.revenue.estimated_profit}
                    />
                    </div>
                </>
            }
            {   
                report && report.length !== 0 &&
                <>
                    <div className='col col-sm-12'>
                    <ReservationsRevenue
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
