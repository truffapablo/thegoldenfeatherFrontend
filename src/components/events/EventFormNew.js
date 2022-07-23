import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createEvent } from '../../actions/events';
import { removeError, setError } from '../../actions/ui';
import { validateEvent } from '../../helpers/eventHelper';
import { useForm } from '../../hooks/useForm'

export const EventFormNew = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { msgError } = useSelector(state => state.ui);

  const [dateOptions, setDateOptions] = React.useState([
    'Fecha específica',
    'Fecha abierta',
  ]);

  const [selectedDateType, setSelectedDateType] = React.useState({
    specific: false,
    open: true,
  });

  const [specificDate, setSpecificDate] = useState('');

  useEffect(()=>{
    setSelectedDateType({
        specific: true,
        open: false,
      });
  },[])

  const handelSelectDateOption = (e) => {
    if (e.target.value === 'Fecha específica') {
        setDaySchedule([])
        setSelectedDateType({
          specific: true,
          open: false,
        });
      } else {
        setSelectedDateType({
          specific: false,
          open: true,
        });
      }
  }

  const {specific, open} = selectedDateType;

  const availableDays = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  const [daySchedule, setDaySchedule] = React.useState([]);

  const handleDaySchedule = (e) => {
    if (daySchedule.includes(e.target.value)) {
      //console.log('existe en el array...hay q quitarlo');
      const days = daySchedule.filter((days) => days !== e.target.value);
      setDaySchedule(days);
    } else {
      //console.log('NO existe en el array...hay q agregarlo');
      setDaySchedule([...daySchedule, e.target.value]);
    }
  };

  const [formValues, handleInputChange, reset] = useForm({
      title: '',
      description: '',
      price:'',
      commission:'',
      currency:'',
      start:'',
      end:'',
      location:'',
      address:'',
      city:'',

  });

  const {title, description, price, commission, currency, start, end, location, address, city} = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = null;
    if(selectedDateType.specific){
        data = {
            ...formValues,
            schedule:null,
            date:specificDate
        }
    }else{

        data = {
            ...formValues,
            schedule:daySchedule,
            date:null
        }
    }
    
    
    dispatch(removeError());
    const errors = validateEvent(data);
    dispatch(setError(errors));
    
    if(Object.keys(errors).length === 0) {
      dispatch(removeError());
      
      /* const newEvent =  {
        ...formValues,
      } */
      //dispatch(createEvent(newEvent))
      dispatch(createEvent(data))
      .then((response) => {
        if(response) {

          Swal.fire({
              title: 'Evento creado',
              text: 'El evento se ha creado correctamente',
              icon: 'success',
              confirmButtonText: 'Ok'
          }).then(() => {
              reset();
              navigate('/dashboard/events');
          });
      }else{
          Swal.fire({
              title: 'Error',
              text: 'No se ha podido crear el evento',
              icon: 'error',
              confirmButtonText: 'Ok'
          });
      }
      });



    }
  }

  useEffect(()=>{
    /**
     * Aca realizamos el sort
     */
    
    let copy  = daySchedule;
    copy.sort()
    setDaySchedule(copy)
  },[daySchedule])


  return (
    <form onSubmit={handleSubmit} className="row g-3 animate__animated animate__fadeIn">
        <div className="form-group col-md-12">
            <label htmlFor="title">Título:</label>
            <input type="text" className="form-control" name="title" value={title} id="title" placeholder="Título" onChange={handleInputChange}/>
            { msgError!==null && msgError.title && <small className="form-text text-danger">{msgError.title}</small> }
        </div>
        <div className="form-group col-md-12">
            <label htmlFor="description">Descripción:</label>
            <textarea name='description' className="form-control" value={description} placeholder="Descripción" onChange={handleInputChange}></textarea>
            { msgError!==null && msgError.description && <small className="form-text text-danger">{msgError.description}</small> }
        </div>
        <div className="form-group col-md-4">
            <label htmlFor="location">Ubicación:</label>
            <input type="text" className="form-control" name="location" value={location} id="location" placeholder="Ubicación" onChange={handleInputChange}/>
            { msgError!==null && msgError.location && <small className="form-text text-danger">{msgError.location}</small> }
        </div>
        <div className="form-group col-md-4">
            <label htmlFor="address">Dirección:</label>
            <input type="text" className="form-control" name="address" value={address} id="address" placeholder="Dirección" onChange={handleInputChange}/>
            { msgError!==null && msgError.address && <small className="form-text text-danger">{msgError.address}</small> }
        </div>
        <div className="form-group col-md-4">
            <label htmlFor="city">Ciudad:</label>
            <input type="text" className="form-control" name="city" value={city} id="city" placeholder="Dirección" onChange={handleInputChange}/>
            { msgError!==null && msgError.city && <small className="form-text text-danger">{msgError.city}</small> }
        </div>
        <div className="form-group col-md-4">
            <label htmlFor="price">Precio base:</label>
            <input type="number" className="form-control" name="price" value={price} id="price" placeholder="Precio base" onChange={handleInputChange}/>
            { msgError!==null && msgError.price && <small className="form-text text-danger">{msgError.price}</small> }
        </div>
        <div className="form-group col-md-4">
            <label htmlFor="commission">Comisión:</label>
            <input type="number" className="form-control" name="commission" value={commission} id="commission" placeholder="Comisión" onChange={handleInputChange}/>
            { msgError!==null && msgError.commission && <small className="form-text text-danger">{msgError.commission}</small> }
        </div>
        <div className="form-group col-md-4">
            <label htmlFor="currency">Moneda:</label>
            <input type="text" className="form-control" name="currency" value={currency} id="currency" placeholder="Comisión" onChange={handleInputChange}/>
            { msgError!==null && msgError.currency && <small className="form-text text-danger">{msgError.currency}</small> }
        </div>
        <div className="form-group col-md-12">
        <label htmlFor="selectDateOption">Seleccionar Fecha:</label>
        <select
          id="selectDateOption"
          className="form-select mb-3"
          aria-label="Default select example"
          onChange={handelSelectDateOption}
        >
            {dateOptions.map((opt, index) => {
            return (
              <option key={index} value={opt}>
                {opt}
              </option>
            );
          })}

        </select>
        {specific && (
          <div className="col">
            <input 
            type="date" 
            className="form-control mb-3" 
            name="date"
            value={specificDate}
            onChange={(e)=>{setSpecificDate(e.target.value)}}
            />
          </div>
          
        )}
        { specific && msgError!==null && msgError.schedule && <small className="form-text text-danger">{/* msgError.schedule */ 'La fecha es obligatoria.'}</small> }
        {open &&
          <div>
          <p>Seleccionar días hábiles:</p>  
          
          {
            
          availableDays.map((day, index) => {
            return (
              <div className="form-check form-check-inline mb-3" key={index}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={index}
                  id={index}
                  name={day}
                  onChange={handleDaySchedule}
                />
                <label className="form-check-label" htmlFor={index}>
                  {day}
                </label>
              </div>
              
            );
            
          })}
          
          </div>
          
          }
          { open && msgError!==null && msgError.schedule && <small className="form-text text-danger">{msgError.schedule}</small> }
        </div>

        {/* <div className="form-group col-md-12">
            <label htmlFor="schedule">Cronograma:</label>
            <textarea name='schedule' className="form-control" value={schedule} placeholder="Cronograma" onChange={handleInputChange}></textarea>
            { msgError!==null && msgError.schedule && <small className="form-text text-danger">{msgError.schedule}</small> }
        </div> */}
        <div className="form-group col-md-6">
            <label htmlFor="start">Empieza:</label>
            <input type="time" className="form-control" name="start" value={start} id="start" placeholder="Empieza" onChange={handleInputChange}/>
            { msgError!==null && msgError.start && <small className="form-text text-danger">{msgError.start}</small> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="end">Termina:</label>
            <input type="time" className="form-control" name="end" value={end} id="end" placeholder="Empieza" onChange={handleInputChange}/>
            { msgError!==null && msgError.end && <small className="form-text text-danger">{msgError.end}</small> }
        </div>
        <button type="submit" className="btn btn-primary btn-reserve">Crear Evento</button>
        
    </form>
  )
}
