import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteEvent } from '../../actions/events';

export const EventById = () => {

  const { list } = useSelector(state => state.events);
  const {id} = useParams();
 
  const event = list.find(event => event.id === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const edit = () => {
    navigate(`/dashboard/events/${id}/edit`);
  }
  const eventDelete = () => {

    Swal.fire({
      title: 'Estas seguro?',
      html: `<p>
        Esta acción no se puede deshacer.
        <br/>
        Todas las reservas que no esten confirmadas y que tengan asociado el evento serán canceladas.
        </p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#263032',
      cancelButtonColor: '#C59B5F',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {

      if (result.value) {
        navigate(`/dashboard/events`);
        dispatch(deleteEvent(id));
        Swal.fire({
          title: 'Eliminado',
          text: 'El evento ha sido eliminado',
          icon: 'success',
          confirmButtonColor: '#C59B5F',
        })
      }
    });
    
  }


  return (
    <div className='container mt-5 animate__animated animate__fadeIn'>
       <h2>Evento {event.title}</h2>
       <div className='row'>
          <div className='col-md-10'>
          <ul>
            <li>Evento: {event.title}</li>
            <li>Descripción: {event.description}</li>
            <li>Precio: ${event.price} {event.currency}</li>
            <li>Cronograma: {event.schedule}</li>
            <li>Empieza: {event.start}hs</li>
            <li>Termina: {event.end}hs</li>
            <hr/>
            <li>Ubicación: {event.location}</li>
            <li>Dirección: {event.address}</li>
            <li>Ciudad: {event.city}</li>
            
          </ul>
          </div>
          <div className='col-md-2'>
            <div className='d-grid gap-2'>
              <button className="btn btn-reserve btn-block" onClick={edit}>Editar</button>
              <button className="btn btn-reserve btn-block" onClick={eventDelete}>Eliminar</button>
            </div>
          </div>
       </div>
    </div>
  )
}
