import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { createTransfer } from '../../actions/transfer';
import { removeError, setError } from '../../actions/ui';
import { validateTransfer } from '../../helpers/transferHelper';
import { useForm } from '../../hooks/useForm';

export const TransferFormNew = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui);
    const [formValues, handleInputChange, reset] = useForm({
        origin:'',
        destination:'',
        price:'',
        commission:'0',
    });

    const {origin, destination, price, commission} = formValues;

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(removeError());
        const errors = validateTransfer(formValues);
        dispatch(setError(errors));
        
        if(Object.keys(errors).length === 0) {
            dispatch(removeError());

            const newTransfer =  {
                ...formValues,
            }
            dispatch(createTransfer(newTransfer))
            .then((response) => {
                if(response) {

                    Swal.fire({
                        title: 'Transfer creado',
                        text: 'El transfer se ha creado correctamente',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then(() => {
                        reset();
                        navigate('/dashboard/transfers/list');
                    });
                }else{
                    Swal.fire({
                        title: 'Error',
                        text: 'No se ha podido crear el transfer',
                    });
                }
            });
        }
    }


  return (
    <form onSubmit={handleSubmit} className="row g-3 animate__animated animate__fadeIn">
        <div className="form-group col-md-6">
            <label htmlFor="origin">Origen:</label>
            <input type="text" className="form-control" name="origin" value={origin} id="origin" placeholder="Origen" onChange={handleInputChange}/>
            { msgError!==null && msgError.origin && <div className="alert alert-danger">{msgError.origin}</div> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="destination">Destino:</label>
            <input type="text" className="form-control" name="destination" value={destination} id="destination" placeholder="Destino" onChange={handleInputChange}/>
            { msgError!==null && msgError.destination && <div className="alert alert-danger">{msgError.destination}</div> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="price">Precio base:</label>
            <input type="number" className="form-control" name="price" value={price} id="price" placeholder="Precio base" onChange={handleInputChange}/>
            { msgError!==null && msgError.price && <div className="alert alert-danger">{msgError.price}</div> }
        </div>
        <div className="form-group col-md-6">
            <label htmlFor="commission">Comisión:</label>
            <input type="number" className="form-control" name="commission" value={commission} id="commission" placeholder="Comisión" onChange={handleInputChange}/>
            { msgError!==null && msgError.commission && <div className="alert alert-danger">{msgError.commission}</div> }
        </div>
        <button type="submit" className="btn btn-primary btn-reserve">Crear Transfer</button>
    </form>
  )
}
