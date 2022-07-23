import React from 'react'
import moment from 'moment';
import 'moment/locale/es';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { firstLetterToUpperCase } from '../../helpers/firstLetterToUpperCase';

export const EventList = () => {
  
  
  const navigate = useNavigate();
  const {list} = useSelector(state => state.events);
  const details = (id) => {
    navigate(`/dashboard/events/${id}`);
  }

  const reserveEvent = (id) => {
    navigate(`/dashboard/reservations/new/${id}`);
  }
  
  return (
        <div className='animate__animated animate__fadeIn'>
            {
                list && list.map(event => {
                    return (
                        <div className="card mb-3 mt-5 event-card" key={event.id}>
                        <div className="row g-0">
                        <div className="col-md-12">
                            <div className="card-body">
                                <h3 className="card-title">{event.title}</h3>
                                <p className="card-text">{event.description}</p>
                                {
                                    event.schedule &&
                                    <p className="card-text">
                                    <small className="text-muted">Días: 
                                    {
                                        event.schedule.map((day, index) =>{
                                            return(
                                                <span key={index}>
                                                   {event.schedule.length !== index + 1 ? ` ${firstLetterToUpperCase(moment().day(day).format('dddd'))}, `:` ${firstLetterToUpperCase(moment().day(day).format('dddd'))}.`}
                                                </span>
                                            )
                                        })
                                    }
                                    </small>
                                    </p>
                                }

                                {
                                    event.date &&
                                    <p className="card-text">
                                    <small className="text-muted">Día: {moment.utc(event.date).format('DD-MM-YYYY')}</small>
                                    </p>
                                }
                                
                                <a className='cpointer' onClick={()=>{details(event.id)}}><button className='btn btn-reserve'>Ver detalles</button></a>
                                {' '}
                                <a className='cpointer' onClick={()=>{reserveEvent(event.id)}}><button className='btn btn-reserve'>Reservar</button></a>
                            </div>
                        </div>
                        </div>
                        </div>
                    )
                })
            }
           


        </div>
  )
}
