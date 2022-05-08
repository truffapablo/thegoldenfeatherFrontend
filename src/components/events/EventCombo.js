import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm';

export const EventCombo = () => {
  
  const {list} = useSelector(state => state.events);
  
  const [eventValue, handleInputChange] = useForm({
    event: '',
  });

  const { event } = eventValue;
  

  return (
    <div className="form-group">
        <label htmlFor="event">Eventos:</label>
        <select className="form-control" name="event" value={event} id="eventList" onChange={handleInputChange}>
            {
                list.map(opt => {
                    return <option key={opt.id} value={opt.id}>{opt.title}</option>
                })
            }
        </select>
    </div>
  )
}
