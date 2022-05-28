import React from 'react'

export const ReservationTransferFormNew = () => {
  return (
    <>
    <form>
        <div className="form-group">
            <label htmlFor="exampleFormControlSelect1">Seleccione el tipo de reserva</label>
            <select className="form-control" id="exampleFormControlSelect1">
                <option>Reserva de Transfer</option>
                <option>Reserva personalizada</option>
            </select>
        </div>
    </form>
    </>
  )
}
