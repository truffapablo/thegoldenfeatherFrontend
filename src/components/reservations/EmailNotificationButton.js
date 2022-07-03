import React from 'react'
import Swal from 'sweetalert2'

export const EmailNotificationButton = ({email}) => {
    
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
                Swal.fire({
                    title: 'Notificación',
                    html: `<p>Se notificó el estado de la reserva al correo: <strong>${email}</strong></p>`,
                    icon: 'success',
                    confirmButtonColor: '#263032',
                  });
            }
          })
    }
  
    return (
    <>
        <button className='btn btn-sm btn-reserve' onClick={notify}><i className="fa-solid fa-paper-plane"></i> Notificar por email</button>
    </>
  )
}
