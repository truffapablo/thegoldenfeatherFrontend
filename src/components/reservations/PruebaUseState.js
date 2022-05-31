import React from 'react'

export const PruebaUseState = () => {

  const [transfer, setTransfer] = React.useState('');
  const handleTransferChange = ({ target }) => {
    setTransfer({
      [target.name]: target.value
    });
  }

  return (
    <div>
        <h2>Prueba UseState</h2>
        <select name='transfer' onChange={handleTransferChange}>
            <option value=''>Seleccione una opción</option>
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
        </select>
    </div>
  )
}
