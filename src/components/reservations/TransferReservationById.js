import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { cancelTransferReservation } from "../../actions/transferReservation";
import { convertDate } from "../../helpers/convertDate";
import { reservationStatus} from './reservationStatus';
export const TransferReservationById = () => {

    const {id} = useParams();
    const {transferList} = useSelector(state => state.reservations);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const transfer = transferList.find(transfer => transfer.id === id);

    const complete = (e) => {}
    const cancel = () => {
        Swal.fire({
          title: '¿Estás seguro?',
          text: "No podrás revertir esto",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#263032',
          cancelButtonColor: '#C59B5F',
          confirmButtonText: 'Sí, cancelar!',
          cancelButtonText: 'Abortar!',
        }).then((result) => {
          if (result.value) {
            dispatch(cancelTransferReservation(id)).then(data => {
              if (data) {
                Swal.fire({
                  title: 'Reserva cancelada',
                  text: 'El transfer ha sido cancelado',
                  icon: 'success',
                  confirmButtonColor: '#263032',
                })
                navigate('/dashboard/reservations');
               
              }
            });
          }
        })
      }
    const confirm = (e) => {}
    const edit = (e) => {}



    return (
        <div className='container mt-5 animate__animated animate__fadeIn'>
            <h2>Transfer #{transfer.confirmation}</h2>
            <div className='row'>
                <div className='col-md-10'>
                    <ul>
                        <li>Fecha de la reserva: {convertDate(transfer.date)}</li>
                        <li>Horario de la reserva: {transfer.time}hs</li>
                        <li>Origen: {transfer.origin}</li>
                        <li>Destino: {transfer.destination}</li>
                        <hr/>
                        <li>Nombre del huesped: {transfer.firstName} {transfer.lastName}</li>
                        <li>Email del huesped: {transfer.email}</li>
                        <li>Teléfono del huesped: {transfer.phone}</li>
                        <li>Número de personas: {transfer.peopleQuantity}</li>
                        <hr/>
                        <li>Precio: ${transfer.price + transfer.commission}</li>
                        <li>Estado: {transfer.status}</li>
                    </ul>
                </div>
                {
            transfer.status !== reservationStatus.reservationCancelled &&
            <div className='col-md-2'>
              <div className='d-grid gap-2'>
                {
                  transfer.status !== reservationStatus.reservationConfirmed &&
                  transfer.status !== reservationStatus.reservationCompleted &&
                  transfer.status !== reservationStatus.reservationCancelled &&
                  <button className="btn btn-reserve btn-block" onClick={confirm}>Confirmar</button>
                }
                {
                  transfer.status !== reservationStatus.reservationConfirmed &&
                  transfer.status !== reservationStatus.reservationCompleted &&
                  transfer.status !== reservationStatus.reservationCancelled &&
                  <button className="btn btn-reserve btn-block" onClick={edit}>Editar</button>
                  
                }
                {
                  transfer.status == reservationStatus.reservationConfirmed &&
                  <button className="btn btn-reserve btn-block" onClick={complete}>Completar</button>
                }
                {
                  transfer.status !== reservationStatus.reservationCompleted &&
                  transfer.status !== reservationStatus.reservationCancelled &&
                  <button className="btn btn-reserve btn-block" onClick={cancel}>Cancelar</button>
                }
                
              </div>
            </div>
          }
            </div>

        </div>
    )
};