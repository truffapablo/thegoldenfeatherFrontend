import React from 'react'

export const InputForm = ({label='input', inputType='text', inputClass='form-control', name, value, handleInputChange, msgError}) => {
  return (
    <div className="form-group col-md-6">
            <label htmlFor={name}>{label}:</label>
            <input type={inputType} className={inputClass} name={name} value={value} id={name} placeholder={label} onChange={handleInputChange}/>
            { msgError!==null && msgError[name] && <div className="alert alert-danger">{msgError[name]}</div> }
    </div>
  )
}
