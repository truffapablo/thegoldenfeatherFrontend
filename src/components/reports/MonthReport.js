import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { getMonthReport } from '../../actions/reports';
export const MonthReport = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [month, setMonth] = useState(moment.utc().format('M'));

    let box = Array.from(Array(moment().daysInMonth()), (_, i) => i + 1)

    console.log(box);
    


    /* const [monthList, setMonthList] = useState([
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
    ]) */
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
                {loading?<h2>Cargando reporte...</h2>: <h2>Reporte mensual.</h2>}
            </div>
        </div>
        
        <div className='row'>
            <div className='col col-sm-12'>
                DATA
                {month}
            </div>
        </div>
    </div>
  )
}
