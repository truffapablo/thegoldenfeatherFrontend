import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const TransferList = () => {

    const navigate = useNavigate();
    const {list} = useSelector(state => state.transfers);
    
    const details = (id) => {
        console.log(id);
        navigate(`/dashboard/transfers/${id}/edit`);
    } 

  return (
    <div className='mt-5 table-responsive animate__animated animate__fadeIn'>
    <h2>Transfers</h2>
        <table className="table table-success table-striped">
            <thead>
                <tr>
                    <th>Origen</th>
                    <th>Destino</th>
                    <th>Precio Base</th>
                    <th>Comisión</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {
                    list && list.map(transfer => {
                        return (
                            <tr key={transfer.id}>
                                <td>{transfer.origin}</td>
                                <td>{transfer.destination}</td>
                                <td>${transfer.price}</td>
                                <td>${transfer.commission}</td>
                                <td><a className='cpointer' onClick={()=>{details(transfer.id)}}>Editar</a></td>
                            </tr> 
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}
