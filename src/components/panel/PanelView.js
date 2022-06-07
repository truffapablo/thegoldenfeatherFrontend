import React from "react";
import { useSelector } from "react-redux";
import { AchievedIncome } from "./AchievedIncome";
import { EspectedIncome } from "./EspectedIncome";
import { ReservationChart } from "./ReservationChart";
import { ReservationsDataCard } from "./ReservationsDataCard";

export const PanelView = () => {

    const {list, customList, transferList} = useSelector(state => state.reservations); 
    return (
        <div className='container-fluid px-4 custom-view'>
            <div className='row mt-5'>
            <h1 className="mb-3">Panel</h1>
            <div className='col-md-12'>
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-4">
                        <ReservationsDataCard
                        list={list}
                        title='Reservas de Evento'
                        />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-4">
                        <ReservationsDataCard
                        list={customList}
                        title='Reservas personalizadas'
                        icon={'feather-pointed'}
                        />
                    </div>
                    <div className="col-xs-12 col-sm-12 col-md-4">
                        <ReservationsDataCard
                        list={transferList}
                        title='Reservas de transfers'
                        icon={'car'}
                        />
                    </div>
                
                    
                </div>        
            </div>
            <div className='col-md-8 mt-5'>
                <EspectedIncome/>
                <AchievedIncome/>
            </div>
            <div className='col-md-4 mt-5'>
                <ReservationChart/>
                
            </div>
            </div>
        </div>
    )
}