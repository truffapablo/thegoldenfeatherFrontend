import React from 'react'

export const TransferReservationSelect = ({handleTransferChange, transfer, transferList, otherOptions }) => {
  return (
    <>
      <div className="form-group">
          <label htmlFor="selectTransfer">Seleccione el tipo de transfer</label>
          <select className="form-control" id="selectTransfer" name='transfer' value={transfer} onChange={handleTransferChange}>
              {
                  transferList.map(transfer => (
                      <option key={transfer.id} value={transfer.id}>{transfer.origin} - {transfer.destination}</option>
                  ))
              }
              <option value="other">Otros</option>
          </select>
      </div>
    </>
  )
}
