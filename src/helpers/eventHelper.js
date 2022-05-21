import validator from 'validator';


export function validateEvent(event){
    const errors = {};
    const {title, description, price, commission, currency, schedule, start, end, location, address, city} = event;

    if(!title) errors.title = 'El título es obligatorio';
    if(!description) errors.description = 'La descripción es obligatoria';
    if(!price) errors.price = 'El precio es obligatorio';
    if(!commission) errors.commission = 'La comisión es obligatoria';
    if(!currency) errors.currency = 'La moneda es obligatoria';
    if(!schedule) errors.schedule = 'El horario es obligatorio';
    if(!start) errors.start = 'La fecha de inicio es obligatoria';
    if(!end) errors.end = 'La fecha de fin es obligatoria';
    if(!location) errors.location = 'La ubicación es obligatoria';
    if(!address) errors.address = 'La dirección es obligatoria';
    if(!city) errors.city = 'La ciudad es obligatoria';

    if(title.length < 3 || title.length > 300 ) errors.title = 'El título debe tener entre 3 y 300 caracteres';
    if(description.length < 3 || description.length > 5000 ) errors.description = 'La descripción debe tener entre 3 y 5000 caracteres';
    if(typeof parseFloat(price) !== 'number') errors.price = 'El precio debe ser un número';
    if(typeof parseFloat(commission) !== 'number') errors.commission = 'La comisión debe ser un número';
    if(currency.length < 3 || currency.length > 50 ) errors.currency = 'La moneda debe tener entre 3 y 50 caracteres';
    if(schedule.length < 3 || schedule.length > 5000 ) errors.schedule = 'El horario debe tener entre 3 y 5000 caracteres';
    if(location.length < 3 || location.length > 300 ) errors.location = 'La ubicación debe tener entre 3 y 300 caracteres';
    if(address.length < 3 || address.length > 300 ) errors.address = 'La dirección debe tener entre 3 y 300 caracteres';
    if(city.length < 3 || city.length > 300 ) errors.city = 'La ciudad debe tener entre 3 y 300 caracteres';

    if(!start.match(/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/)) errors.start = 'El horario tiene que cumplir con el formato HH:MM';
    if(!end.match(/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/)) errors.end = 'El horario tiene que cumplir con el formato HH:MM';
    
    return errors;





}