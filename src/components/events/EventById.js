import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { deleteEvent } from '../../actions/events';
import { roles } from '../../types/role';

export const EventById = () => {

  const { list } = useSelector(state => state.events);
  const {role} = useSelector(state => state.auth);
  const {id} = useParams();
  const event = list.find(event => event.id === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if(!event){
    <Navigate to='/'/>
    return null
  }

  const edit = () => {
    navigate(`/dashboard/events/${id}/edit`);
  }
  const eventDelete = () => {

    Swal.fire({
      title: '¿Estás seguro?',
      html: `<p>
        Esta acción no se puede deshacer.
        <br/>
        Todas las reservas que no esten confirmadas y que tengan asociado el evento serán canceladas.
        </p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#263032',
      cancelButtonColor: '#C59B5F',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText:'Cancelar'
    }).then((result) => {
      if (result.value) {
        navigate(`/dashboard/events`);
        dispatch(deleteEvent(id)).then(response => {
          if(response){
            Swal.fire({
              title: 'Eliminado',
              text: 'El evento ha sido eliminado',
              icon: 'success',
              confirmButtonColor: '#C59B5F',
            })
          }else{
            Swal.fire({
              title: 'Error',
              text: 'No se pudo eliminar el evento.',
              icon: 'error',
              confirmButtonColor: '#C59B5F',
            })

          }
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
            <li>Comisión: ${event.commission} {event.currency}</li>
            <li>Cronograma: {event.schedule}</li>
            <li>Empieza: {event.start}hs</li>
            <li>Termina: {event.end}hs</li>
            <hr/>
            <li>Ubicación: {event.location}</li>
            <li>Dirección: {event.address}</li>
            <li>Ciudad: {event.city}</li>
            
          </ul>
          </div>
          {
            role === roles.admin &&
            <div className='col-md-2'>
              <div className='d-grid gap-2'>
                <button className="btn btn-reserve btn-block" onClick={edit}>Editar</button>
                <button className="btn btn-reserve btn-block" onClick={eventDelete}>Eliminar</button>
              </div>
            </div>
          }
       </div>
    </div>
  )
}
