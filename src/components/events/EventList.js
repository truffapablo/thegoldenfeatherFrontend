import React from 'react'
import { useSelector } from 'react-redux'
import placeholder from './placeholder.jpg'
export const EventList = () => {
  
  const {list} = useSelector(state => state.events);
  return (
        <div className='animate__animated animate__fadeIn'>
            {
                list && list.map(event => {
                    return (
                        <div className="card mb-3 mt-5" key={event.id}>
                        <div className="row g-0">
                        <div className="col-md-4">
                            <img src={placeholder} className="img-fluid rounded-start" alt=""/>
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{event.title}</h5>
                                <p className="card-text">{event.description}</p>
                                <p className="card-text"><small className="text-muted">Días: {event.schedule}</small></p>
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
