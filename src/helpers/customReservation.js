import validator from 'validator';
import { validateReservation } from './reservationHelper';

export const validateCustomReservation = (reservation) => {
    
    const errors = validateReservation(reservation);
    
    const {price, commission} = reservation;    

    if (price && !validator.isNumeric(price)) errors.price = 'El precio no es válido';
    
    if(!commission || !validator.isNumeric(commission)) errors.commission = 'La comisión es requerida y debe ser numérica';

    return errors

    
}
