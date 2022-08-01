import React, { useEffect } from 'react'
import validator from 'validator';
import moment from 'moment';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReportByDate } from '../../actions/reports';
import { ReservationByStatus } from './ReservationByStatus';
import { ReservationByType } from './ReservationByType';
import { ReservationsRevenue } from './ReservationsRevenue';
import { DailyPieChart } from './DailyPieChart';
import { roles } from '../../types/role';
import { SelectEmployee } from './SelectEmployee';
export const DateReport = () => {

    const { role } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [report, setReport] = useState([])
    const [date, setDate] = useState(moment().format('YYYY-MM-DD'));

    const [selectedEmployee, setSelectedEmployee] = useState({
        select:false,
        employee:false
    });
    
    useEffect(()=>{
        if(selectedEmployee.select){
            if(selectedEmployee.employee === 'all'){
                setLoading(true);
                dispatch(getReportByDate({
                    from:date,
                    to:date,
                }))
                .then(data => {
                    setLoading(false);
                    setReport(data);
                })
            }else{
                setLoading(true);
                dispatch(getReportByDate({
                    from:date,
                    to:date,
                },selectedEmployee.employee))
                .then(data => {
                    setLoading(false);
                    setReport(data);
                })

            }
        }

        
    },[date,selectedEmployee])

    useEffect(()=>{
        setSelectedEmployee({
            select:true,
            employee:'all'
        });
    },[])
  
  const setDateReport = (d) => {
        if(dateValidation(d)){
            setDate(d);
        }else{
            console.log('no es una fecha valida');
        }
  }


  const dateValidation = (date) => {
    return validator.isDate(date)? true:false
  }

  return (
    <div className="row g-3 animate__animated animate__fadeIn mt-2">
        <div className='row'>
            <div className='col col-sm-12'>
                {loading?<h2>Cargando reporte...</h2>: <h2 className='animate__animated animate__fadeIn'>Reporte por fecha {moment(date).format('DD-MM-YYYY')}</h2>}
            </div>
            <div className='col col-sm-6'>
            <label htmlFor="selectDate">Seleccioná la fecha del reporte.</label>
            <input type="date" value={date} className="form-control" id="selectDate" onChange={(e)=>{setDateReport(e.target.value)}}/>
            </div>
            
        </div>
        <div className='row'>
            <div className='col col-sm-12 col-md-6 mt-2'>
                {   
                    role === roles.admin &&
                    <>
                    <SelectEmployee
                    setSelectedEmployee={setSelectedEmployee}
                    />
                    </>
                }
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
