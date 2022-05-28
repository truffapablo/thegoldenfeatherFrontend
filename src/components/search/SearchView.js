import React from 'react'
import { useSelector } from 'react-redux'
import { SearchCard } from './SearchCard'

export const SearchView = () => {
  const {list} = useSelector(state => state.search)
  return (
    <div className='container-fluid mt-5'>
        <div className='row mt-2'>
            <div className='col-md-12'>
            <h2>Resultados de busqueda</h2>
            <ul className='search-ul'>
              {
                list.map(reservation => (
                  <SearchCard
                  key={reservation.id}
                  reservation={reservation}
                  />
                ))
              }
            </ul>
            </div>
        </div>
    </div>
  )
}
