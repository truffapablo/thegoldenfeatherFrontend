import React, { useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux'
import { mailToClient } from '../../actions/mailToClient'
import { Button } from 'react-bootstrap';

export const EmailNotificationButton = ({email, reservation}) => {
    
  const [notifying, setNotifying] = useState(false);

    const notify = () => {
        Swal.fire({
            title: '¿Querés notificar al huésped?',
            text: "Enviaremos el estado actual de la reserva.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#263032',
            cancelButtonColor: '#C59B5F',
            confirmButtonText: 'Sí, Notificar!',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.value) {
              setNotifying(true);
              mailToClient({id:reservation.id, pattern:reservation.pattern}).then(rta => {

                if(rta){
                  if(rta.ok){
                    Swal.fire({
                      title: 'Notificación',
                      html: `<p>Se notificó el estado de la reserva al correo: <strong>${email}</strong></p>`,
                      icon: 'success',
                      confirmButtonColor: '#263032',
                    });
                  }
                }

                setNotifying(false);

              });                
            }
          })
    }
  
    return (
    <>  

        {
          !notifying && <button className='btn btn-sm btn-reserve' onClick={notify}><i className="fa-solid fa-paper-plane"></i> Notificar por email</button>
        }

        {
          notifying && 
          <button className='btn btn-sm btn-reserve' disabled>
            <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        {' '} Enviando mail
        </button>
        }
        
        
        
    </>
  )
}
