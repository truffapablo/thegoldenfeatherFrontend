import React from 'react'

export const SelectEvent = ({event, list, handleInputChange}) => {
    
  return (
    <select className="form-control" name="event" value={event} id="event" onChange={handleInputChange}>
                {
                    list.map(opt => {
                        return <option key={opt.id} value={opt.id}>{opt.title}</option>
                    })
                }
    </select>
  )
}
