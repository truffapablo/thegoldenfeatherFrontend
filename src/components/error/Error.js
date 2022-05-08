import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Error = () => {
    
    const navigate = useNavigate();

    const handleError = () => {
        
    }

    return (
    <div className='container'>
        <div className='row'>
            <div className='col-md-12'>
                <h1>Error</h1>
                <button onClick={handleError}>Error</button>
            </div>
        </div>
    </div>

  )
}
