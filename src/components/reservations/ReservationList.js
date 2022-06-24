import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { convertDate } from '../../helpers/convertDate';
import { today } from '../../helpers/today';
import { types } from '../../types/types';
import { Paginator } from '../paginator/Paginator';
import { AdvanceSearchForm } from './AdvanceSearchForm';
import { ReservationTableList } from './ReservationTableList';

export const ReservationList = () => {

    const { list, customList, transferList } = useSelector(state => state.reservations);
    const { advanceSearch } = useSelector(state => state.search);
    const dispatch = useDispatch();
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
     const [limit, setLimit] = useState(5);
 
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
     
    useEffect(() => {
        /**
         * Si el buscador tiene contenido hay que refrescar las paginas con el contenido del buscador
         * 
         */
        
        if(advanceSearch.data){
            if(advanceSearch.data.length > 0) {
                console.log('Tiene data');
                setNews(advanceSearch.data);
                setCurrentPage(1);
            }
        }



    }, [advanceSearch]);
    
    useEffect(()=>{

        setPages(Math.ceil(news.length / limit));

    },[news]);


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
    
    const cleanSearch = ()=>{
        dispatch({
            type:types.reservationCleanSearch
        });

        setNews(allReservations);
        setCurrentPage(1);

    }

  return (
      <>
        <AdvanceSearchForm/>
        <div className='mt-5 table-responsive'>
            {
                advanceSearch.length === 0
                &&
                <h3>Reservas <span>{convertDate(today(),'DD-MM-YYYY')}</span></h3>
            }
            
            {
                advanceSearch.length === 0
                &&
                <ReservationTableList
                allReservations={allReservations}
                details={details}
                customDetails={customDetails}
                transferDetails={transferDetails}
                limit={limit}
                currentPage={currentPage}
                />
            }

            {
            advanceSearch.length > 0
            &&
            <div>
                <h3>Reservas encontradas <button onClick={()=>{cleanSearch()}} className='btn btn-warning btn-sm'>Limpiar búsqueda</button></h3>
            </div>
            }

            {
                advanceSearch.data &&
                <ReservationTableList
                allReservations={advanceSearch.data}
                details={details}
                customDetails={customDetails}
                transferDetails={transferDetails}
                limit={limit}
                currentPage={currentPage}
                />
            }
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
