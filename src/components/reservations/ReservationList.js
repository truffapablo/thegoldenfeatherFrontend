import React, { useEffect } from 'react'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { convertDate } from '../../helpers/convertDate';
import { Paginator } from '../paginator/Paginator';
import { AdvanceSearchForm } from './AdvanceSearchForm';
import { ReservationTableList } from './ReservationTableList';

export const ReservationList = () => {

    const { list, customList, transferList } = useSelector(state => state.reservations);

    const allReservations = [...list, ...customList, ...transferList];

    const navigate = useNavigate();

    const details = (id) => {
        navigate(`/dashboard/reservations/${id}`);
    }   
    const customDetails = (id) => {
        navigate(`/dashboard/reservations/${id}/custom`);
    }
    const transferDetails = (id) => {
        navigate(`/dashboard/reservations/${id}/transfer`);
    } 
    
    /**
     * Listado de noticias
     */
     const [news, setNews] = useState(allReservations);

     /**
      * El limite es el numero de elementos que se mostraran en la lista
      */
     const [limit, setLimit] = useState(7);
 
     /**
      * Total de paginas a motrar
      */
     const [pages, setPages] = useState(Math.ceil(news.length / limit));
 
     /**
      * Pagina actual
      */
     const [currentPage, setCurrentPage] = useState(1);
 
     const [buttonsPrevAndNext, setButtonsPrevAndNext] = useState({
         prev: false,
         next: false
     });

     useEffect(() => {
        /**
         * Si la pagina actual es la primera, se deshabilitan los botones de previo
         */
        setButtonsPrevAndNext({
            prev: currentPage > 1,
            next: currentPage < pages
        });
    }, []);

    const handlePage = (page) => {
        setCurrentPage(page);
        /**
         * Chequeamos si la pagina actual es la primera o la ultima
         * Y en base a eso determinamos si se debe habilitar el boton de previo o el siguiente
         */
        setButtonsPrevAndNext({
            prev: page > 1,
            next: page < pages
        });
    
    }

    const handlePrev = () => {
        handlePage(currentPage - 1);
    }

    const handleNext = () => {
        handlePage(currentPage + 1);
    }

    const selectedLiStyle = {color: 'red'};

  return (
      <>
        <AdvanceSearchForm/>
        <div className='mt-5 table-responsive'>
            <h2>Reservas</h2>
            <ReservationTableList
            allReservations={allReservations}
            details={details}
            customDetails={customDetails}
            transferDetails={transferDetails}
            limit={limit}
            currentPage={currentPage}
            />
            
            <div>
            <Paginator
                pages={pages}
                currentPage={currentPage}
                handlePrev={handlePrev}
                handleNext={handleNext}
                handlePage={handlePage}
                buttonsPrevAndNext={buttonsPrevAndNext}
            />
        </div>
        </div>
      </>
    
  )
}
