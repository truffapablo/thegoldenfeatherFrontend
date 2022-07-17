import React, { useEffect, useState } from 'react'

import { NavLink, Outlet, useNavigate} from 'react-router-dom';

import { ToastContainer, Toast } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { types } from '../../types/types';



export const ReservationView = () => {
  
  const dipatch = useDispatch();
  const navigate = useNavigate();

  const { list } = useSelector(state => state.notifications);

  const [toastList, setToastList] = useState([]);

  const copylist = [...list];

    const goToReservation = (reservation) => {
      switch (reservation.pattern) {
        case 'EVENT_RESERVATION':
          return details(reservation.id)
        case 'CUSTOM_RESERVATION':
          return customDetails(reservation.id)
        case 'TRANSFER_RESERVATION':
          return transferDetails(reservation.id)
        default:
          break;
      }
    }

    const details = (id) => {
      navigate(`/dashboard/reservations/${id}`);
    }   
    const customDetails = (id) => {
      navigate(`/dashboard/reservations/${id}/custom`);
    }
    const transferDetails = (id) => {
      navigate(`/dashboard/reservations/${id}/transfer`);
    }
  
  
  const dismmissToast = (id) => {
    
    setToastList(toastList.filter(toast => toast.id !== id));
    dipatch({
      type:types.notificationRemove,
      payload:id
    });
  }

  useEffect(()=>{
    
    if(list.length) {
      
      //console.log(copylist.pop());
      setToastList([...toastList,copylist.pop()])
      
    }
  },[list]);
  
  useEffect(()=>{
    const interval = setInterval(()=>{
      
      if(toastList.length) {
        dismmissToast(toastList[0].id)
      }
    },5000)

    return () => {
      clearInterval(interval);
    }

  },[toastList, dismmissToast])

  const createToast = (toast, index) => {

    return (
      <Toast 
        key={index} 
        onClose={()=>{dismmissToast(toast.id)}}
        className={"animate__animated animate__fadeInRight gold-bg white"}
      >
          <Toast.Header>
            <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
            <strong className="me-auto"><a className='cpointer gf-link-blue ' onClick={()=>{goToReservation(toast)}}>{toast.confirmation}</a></strong>
            <small>Hace unos instantes</small>
          </Toast.Header>
          <Toast.Body>{toast.title}.</Toast.Body>
      </Toast>
    )
  }


  return (
    <div className='container-fluid px-4 custom-view'>
      <div className='row mt-5'>
          <div className='col-md-12'>
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <NavLink className= { ({isActive}) => 'nav-link ' + (isActive ? 'active reservation-tab-active':'reservation-tab-inactive')  }  to='list'>Lista</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className= { ({isActive}) => 'nav-link ' + (isActive ? 'active reservation-tab-active':'reservation-tab-inactive')  }  to='new'>Reservar evento</NavLink> 
            </li>
            <li className="nav-item">
              <NavLink className= { ({isActive}) => 'nav-link ' + (isActive ? 'active reservation-tab-active':'reservation-tab-inactive')  }  to='custom'>Reserva personalizada</NavLink> 
            </li>
            <li className="nav-item">
              <NavLink className= { ({isActive}) => 'nav-link ' + (isActive ? 'active reservation-tab-active':'reservation-tab-inactive')  }  to='transfer'>Reserva de transfer</NavLink> 
            </li>
          </ul> 
              <Outlet />   
          </div>
            <ToastContainer className="p-3" position={'top-end'}>
              {
                
                toastList.map((toast, index)=>{
                  return(
                    createToast(toast, index)
                  )
                })
              }
            </ToastContainer>
      </div>
    </div>
  )
}
