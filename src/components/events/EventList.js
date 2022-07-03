import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import placeholder from './placeholder.jpg'
export const EventList = () => {
  const navigate = useNavigate();
  const {list} = useSelector(state => state.events);
  const details = (id) => {
    navigate(`/dashboard/events/${id}`);
} 
  return (
        <div className='animate__animated animate__fadeIn'>
            {
                list && list.map(event => {
                    return (
                        <div className="card mb-3 mt-5 event-card" key={event.id}>
                        <div className="row g-0">
                        {/* <div className="col-md-4">
                            <img src={placeholder} className="img-fluid rounded-start" alt=""/>
                        </div> */}
                        <div className="col-md-12">
                            <div className="card-body">
                                <h3 className="card-title">{event.title}</h3>
                                <p className="card-text">{event.description}</p>
                                <p className="card-text"><small className="text-muted">Días: {event.schedule}</small></p>
                                <a className='cpointer' onClick={()=>{details(event.id)}}><button className='btn btn-reserve'>Ver detalles</button></a>
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
