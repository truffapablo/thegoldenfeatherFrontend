import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { convertDate } from "../../helpers/convertDate";

export const TransferReservationById = () => {

    const {id} = useParams();
    const {transferList} = useSelector(state => state.reservations);

    const transfer = transferList.find(transfer => transfer.id === id);
    console.log(transfer);
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
            </div>

        </div>
    )
};