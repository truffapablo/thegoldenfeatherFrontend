import React from 'react'

export const SelectEvent = ({event, list, setEvent}) => {
  
  return (
    <select className="form-control" name="event" value={event} id="event" onChange={(e)=>{setEvent(e.target.value)}}>
                {
                    list.map(opt => {
                        return <option key={opt.id} value={opt.id}>{opt.title}</option>
                    })
                }
    </select>
  )
}
