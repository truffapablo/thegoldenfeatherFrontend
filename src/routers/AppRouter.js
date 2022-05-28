import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, useNavigate} from "react-router-dom";

import { EventView } from '../components/events/EventView';
import { LoginView } from '../components/login/LoginView';

import { MainNavbar, Navbar } from '../components/ui/MainNavbar';


import { HomeView } from '../components/Home/HomeView';
import { ReportView } from '../components/reports/ReportView';
import { RegisterView } from '../components/register/RegisterView';

import { ReservationNew } from '../components/reservations/ReservationNew';
import { ReservationById } from '../components/reservations/ReservationById';

import { ReservationList } from '../components/reservations/ReservationList';
import { ReservationView } from '../components/reservations/ReservationView';
import { RequireAuth } from './RequireAuth';
import { startChecking } from '../actions/auth';
import { getReservations } from '../actions/reservation';
import { getEvents } from '../actions/events';
import { ReservationEdit } from '../components/reservations/ReservationEdit';
import { EventList } from '../components/events/EventList';
import { EventNew } from '../components/events/EventNew';
import { EventById } from '../components/events/EventById';
import { EventEdit } from '../components/events/EventEdit';

import { ReservationCustom } from '../components/reservations/ReservationCustom';
import { getCustomReservations } from '../actions/customReservation';
import { CustomReservationById } from '../components/reservations/CustomReservationById';
import { ReservationCustomEdit } from '../components/reservations/ReservationCustomEdit';


import { Footer } from '../components/ui/Footer';
import { Sidenav } from '../components/ui/Sidenav';
import { ClientSidenav } from '../components/ui/ClientSidenav';
import { ReservationTransfer } from '../components/reservations/ReservationTransfer';
import { SearchView } from '../components/search/SearchView';



export const AppRouter = () => {

  const dispatch = useDispatch();
  const {checking, uid} = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {

    dispatch(startChecking());

    if(uid) {

        dispatch(getReservations());
        dispatch(getCustomReservations());
        dispatch(getEvents());
        navigate('dashboard/reservations');
    }

  } , [dispatch, uid]);
  
  if(checking){
    return <h5>Espere...</h5>
  }



  return (
    <div className="App">
       
       <MainNavbar/>

        <div id="layoutSidenav">
       {
          uid ? <Sidenav/> : <ClientSidenav/>
       }
      
        <div id="layoutSidenav_content">
        <Routes>

          <Route path="/" exact element={<HomeView />} />
          <Route path="login" element={<LoginView />} />
          <Route path="register" element={<RegisterView/>} />

          <Route path="/dashboard" element={<RequireAuth/>}>
              <Route path='reservations' element={<ReservationView/>}>       
                <Route index element={<ReservationList />}/>  
                <Route path="new" element={<ReservationNew />} />
                <Route path="custom" element={<ReservationCustom />} />
                <Route path="transfer" element={<ReservationTransfer />} />
                <Route path="list" element={<ReservationList />} />  
                <Route path=":id" element={<ReservationById />} />
                <Route path=":id/custom" element={<CustomReservationById />} />
                <Route path=":id/edit" element={<ReservationEdit />} />
                <Route path=":id/custom-edit" element={<ReservationCustomEdit />} />
              </Route>
    
              <Route path='events' element={<EventView/>}>
                <Route index element={<EventList />}/>  
                <Route path="new" element={<EventNew />} />
                <Route path="list" element={<EventList />} />  
                <Route path=":id" element={<EventById />} />
                <Route path=":id/edit" element={<EventEdit />} />
              </Route>

              <Route path='search' element={<SearchView/>}>
                
              </Route>
              
              <Route path="reports" element={<ReportView />} />
          </Route>


          <Route path="*" element={<h1>NOT FOUND</h1>} />

        </Routes>
            <Footer/>
        </div>
        </div>
      
      
        

    </div>
  )
}