import validator from 'validator';

export function validateReservation(reservation) {
  const errors = {};
  const { firstName, lastName, event, peopleQuantity, roomNumber, date, time, email, phone } = reservation;
  
  if (!event) errors.event = 'El evento es requerido';
  if (!firstName) errors.firstName = 'El nombre es requerido';
  if (!lastName) errors.lastName = 'El apellido es requerido';
  if (email && !validator.isEmail(email)) errors.email = 'El email no es válido';
  if (phone && !validator.isNumeric(phone)) errors.phone = 'El teléfono no es válido';
  if (!peopleQuantity) errors.peopleQuantity = 'La cantidad es requerida';
  if (!roomNumber) errors.roomNumber = 'El número de habitación es requerido';
  if (!date) errors.date = 'La fecha es requerida';
  if (!validator.isDate(date)) errors.date = 'La fecha no es válida';
  if (!time) errors.time = 'El horario es requerido';
  
  
  if(date < new Date().toISOString().slice(0,10)) errors.date = 'La fecha no puede ser anterior a la fecha actual';


  if(firstName.length < 3 || firstName.length > 150) errors.firstName = 'El nombre debe tener al menos 3 caracteres y un máximo de 150';
  if(lastName.length < 3 || lastName.length > 150) errors.lastName = 'El apellido debe tener al menos 3 caracteres y un máximo de 150';
  if(event.length < 3 || event.length > 150) errors.event = 'El evento debe tener al menos 3 caracteres y un máximo de 150';
  if(roomNumber.length < 3 || roomNumber.length > 10) errors.roomNumber = 'El número de habitación debe tener al menos 3 caracteres y un máximo de 10';
  
  if(phone){
    if(phone.length < 8 || phone.length > 12) errors.phone = 'El teléfono debe tener al menos 8 caracteres y un máximo de 12';
  }
  
  if(parseInt(peopleQuantity) < 1 || parseInt(peopleQuantity) > 10) errors.peopleQuantity = 'La cantidad debe ser mayor a 0 y menor a 10';

  return errors;
}