import React from 'react'

export const Paginator = ({handlePrev, handleNext, handlePage, currentPage, pages, buttonsPrevAndNext}) => {
    const selectedLiStyle = {color: '#000', background:'#C59B5F'};
    return (
        <>
        <nav aria-label="Page navigation">
                <ul className="pagination" id='pagination'>
                {buttonsPrevAndNext.prev && <li className="page-item"><button className="page-link blue-bg gf-white" onClick={()=>{handlePrev()}}>Atras</button></li>}
                {pages > 1 && Array.from({ length: pages }, (x, i) => (
                    <li 
                    key={i}
                    className="page-item"
                    >
                        <button 
                        style={currentPage === i + 1 ? selectedLiStyle : null}
                        className="page-link blue-bg gf-white"
                        onClick={()=>{handlePage(i + 1 )}}>{i + 1}</button>
                    </li>
                ))}
                {buttonsPrevAndNext.next && <li className="page-item"><button className="page-link blue-bg gf-white" onClick={()=>{handleNext()}}>Siguiente</button></li>}
                </ul>
                </nav>
        </>
    )
}
