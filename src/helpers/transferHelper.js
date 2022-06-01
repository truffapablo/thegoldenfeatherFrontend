import validator from 'validator';


export function validateTransfer(transfer){
    const errors = {};
    const {origin, destination, price, commission} = transfer;

    if(!origin) errors.origin = 'El origen es obligatorio';
    if(!destination) errors.destination = 'El destino es obligatorio';
    if(!price) errors.price = 'El precio es obligatorio';
    if(!commission) errors.commission = 'La comisión es obligatoria';

    
    if(!validator.isLength(origin, {min: 3, max: 300})) errors.origin = 'El origen debe tener entre 3 y 300 caracteres';
    if(!validator.isLength(destination, {min: 3, max: 300})) errors.destination = 'El destino debe tener entre 3 y 300 caracteres';
    if(typeof parseFloat(price) !== 'number') errors.price = 'El precio debe ser un número';
    if(typeof parseFloat(commission) !== 'number') errors.commission = 'La comisión debe ser un número';

    if(parseFloat(price) < 0) errors.price = 'El precio no puede ser negativo';
    if(parseFloat(commission) < 0) errors.commission = 'La comisión no puede ser negativa';

    return errors;

}