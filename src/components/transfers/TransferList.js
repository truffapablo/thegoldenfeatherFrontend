import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteTransfer } from '../../actions/transfer';
import { roles } from '../../types/role';

export const TransferList = () => {

    const navigate = useNavigate();
    const {list} = useSelector(state => state.transfers);
    const {role} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    
    const transferEdit = (id) => {
        
        navigate(`/dashboard/transfers/${id}/edit`);
    }

    const transferDelete = (id) => {
            
            Swal.fire({
                title: '¿Estás seguro?',
                html: `<p>
                Esta acción no se puede deshacer.
                <br/>
                Todas las reservas de transfer que no esten confirmadas y que tengan asociado el transfer serán canceladas.
                </p>`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#263032',
                cancelButtonColor: '#C59B5F',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText:'Cancelar'
            }).then((result) => {

                if (result.value) {

                    dispatch(deleteTransfer(id)).then((response) => {
                        if(response) {
                            Swal.fire({
                                title: 'Borrado',
                                text: 'El transfer se ha borrado correctamente',
                                icon: 'success',
                                confirmButtonText: 'Ok'
                            }).then(() => {
                                navigate('/dashboard/transfers/list');
                            });
                        }else{
                            Swal.fire({
                                title: 'Error',
                                text: 'No se pudo eliminar el transfer',
                                icon: 'error',
                                confirmButtonText: 'Ok'
                            });
                        }
                    });
                }
                
            })
    }

  return (
    <div className='mt-5 table-responsive animate__animated animate__fadeIn'>
    <h2>Transfers</h2>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Origen</th>
                    <th>Destino</th>
                    <th>Precio Base</th>
                    <th>Comisión</th>
                    {
                        role === roles.admin &&
                        <th>Acciones</th>
                    }
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
                                {
                                    role === roles.admin &&
                                    <>
                                        <td>
                                            <a className='cpointer' onClick={()=>{transferEdit(transfer.id)}}>Editar</a> |
                                            <a className='cpointer' onClick={()=>{transferDelete(transfer.id)}}>Eliminar</a> 
                                        </td>
                                    </>
                                }
                            </tr> 
                        )
                    })
                }
            </tbody>
        </table>
    </div>
  )
}
