import React, { useEffect, useState } from 'react'
import moment from 'moment';
import { Bar, Line, Pie } from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto';
import { useDispatch, useSelector } from 'react-redux';
import { getMonthReport } from '../../actions/reports';
import { EventLineChart } from './EventLineChart';
import { MonthReservationsByType } from './MonthReservationsByType';
import { MonthReservationsRevenue } from './MonthReservationsRevenue';
import { roles } from '../../types/role';
import { SelectEmployee } from './SelectEmployee';
export const MonthReport = () => {

    const { role } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [month, setMonth] = useState(moment().format('M'));
    const [year, setYear] = useState(moment().format('YYYY'));
    const [report, setReport] = useState([])
    const [monthList, setMonthList] = useState([
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
    ])

    const [selectedEmployee, setSelectedEmployee] = useState({
        select:false,
        employee:false
    });
    
    useEffect(()=>{
        
        if(selectedEmployee.select){
            if(selectedEmployee.employee === 'all'){
                setLoading(true);
                dispatch(getMonthReport({month, year}))
                .then(data => {
                    setLoading(false);
                    setReport(data);
                });
            }else{
                setLoading(true);
                dispatch(getMonthReport({month, year}, selectedEmployee.employee))
                .then(data => {
                    setLoading(false);
                    setReport(data);
                });
            }
        }
        

        
    },[month,selectedEmployee]);

    useEffect(()=>{
        setSelectedEmployee({
            select:true,
            employee:'all'
        });
    },[])


    const changeMonth = (selectedMonth) =>{
        setMonth(selectedMonth + 1);
    }

  return (
    <div className="row g-3 animate__animated animate__fadeIn mt-2">
        <div className='row'>
            <div className='col col-sm-12'>
                {loading?<h2>Cargando reporte...</h2>: <h2 className='animate__animated animate__fadeIn'>Reporte mensual - {moment().month(month - 1).format("MMMM").toUpperCase()}</h2>}
            </div>
        </div>
        <div className='row'>
            <div className='col col-sm-12'>
            <div className='form-group'>
                <label htmlFor='select-month'>Selecionar mes</label>
            <select className="form-select" value={month} aria-label="Seleccionar el mes del reporte" onChange={(e)=>{changeMonth(e.target.selectedIndex)}}>
                {
                    monthList.map((m, index)=>{
                        return(
                            <option 
                            //selected={index + 1 === month? true:false}
                            key={index} 
                            value={index +1 }>{m}</option>
                        )
                    })
                }
            </select>
            </div>   
            </div>
        </div>
        <div className='row'>
            <div className='col col-sm-12 mt-2'>
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
                    total={true}
                    title={'Ingresos alcanzados'}
                    revenue={report.revenue_overview.profit}
                    />
                </>
                }
            </div>
            <div className='col col-sm-12'>
                {
                report && report.length !==0 &&
                <>
                    <MonthReservationsRevenue
                    total={true}
                    title={'Ingresos estimados'}
                    revenue={report.revenue_overview.estimated_profit}
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
                        month={month}
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
                        month={month}
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
                        month={month}
                        report={report.revenue_detail.transfer}
                        />
                        </>
                    }
                </div>
        </div>
            
        
    </div>
  )
}
