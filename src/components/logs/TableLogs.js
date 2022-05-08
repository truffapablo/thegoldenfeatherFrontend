import React from 'react'
import { convertDate } from '../../helpers/convertDate'

export const TableLogs = ({logs}) => {
  return (
    <div>
        <h2>Logs</h2>
        <table className="table animate__animated animate__fadeIn table-responsive">
        <thead>
            <tr>
            <th scope="col">Usuario</th>
            <th scope="col">Acción</th>
            <th scope="col">Fecha</th>
            </tr>
        </thead>
        <tbody>
            {/* {
                logs.map(log => (
                    <tr key={log.id}>
                        <td>{log.user.name}</td>
                        <td>{log.action}</td>
                        <td>{convertDate(log.created_at)}</td>
                    </tr>
                ))
            } */}
        </tbody>
        </table>
    </div>
  )
}
