import validator from 'validator';

export function validateReservation(reservation) {
  const errors = {};
  const { firstName, lastName, event, peopleQuantity, roomNumber, date, time, email, phone } = reservation;
  
  if(validateEvent(event)) errors.event = validateEvent(event);
  if(validateFirstName(firstName)) errors.firstName = validateFirstName(firstName);
  if(validateLastName(lastName)) errors.lastName = validateLastName(lastName);
  if(validateEmail(email)) errors.email = validateEmail(email);
  if(validatePhone(phone)) errors.phone = validatePhone(phone);
  if(validatePeopleQuantity(peopleQuantity)) errors.peopleQuantity = validatePeopleQuantity(peopleQuantity);
  if(validateRoomNumber(roomNumber)) errors.roomNumber = validateRoomNumber(roomNumber);
  if(validateDate(date)) errors.date = validateDate(date);
  if(validateTime(time)) errors.time = validateTime(time);

  return errors;
}

export function validateTransferReservation (reservation){

  const errors = {};
  const { firstName, lastName, email, phone, date, time, peopleQuantity, roomNumber, origin, destination, price, commission, info } = reservation;

  if(validateFirstName(firstName)) errors.firstName = validateFirstName(firstName);
  if(validateLastName(lastName)) errors.lastName = validateLastName(lastName);
  if(validateEmail(email)) errors.email = validateEmail(email);
  if(validatePhone(phone)) errors.phone = validatePhone(phone);
  if(validateDate(date)) errors.date = validateDate(date);
  if(validateTime(time)) errors.time = validateTime(time);
  if(validatePeopleQuantity(peopleQuantity)) errors.peopleQuantity = validatePeopleQuantity(peopleQuantity);
  if(validateRoomNumber(roomNumber)) errors.roomNumber = validateRoomNumber(roomNumber);
  if(validateOrigin(origin)) errors.origin = validateOrigin(origin);
  if(validateDestination(destination)) errors.destination = validateDestination(destination);
  if(validatePrice(price)) errors.price = validatePrice(price);
  if(validateCommission(commission)) errors.commission = validateCommission(commission);
  if(validateInfo(info)) errors.info = validateInfo(info);

  return errors;
}


const validateEvent = (event) => {
  if(!event) return 'El evento es requerido';
  if(event.length < 3 || event.length > 150) return 'El evento debe tener al menos 3 caracteres y un máximo de 150';
}

const validateFirstName = (firstName) => {
  if(!firstName) return 'El nombre es requerido';
  if(firstName.length < 3 || firstName.length > 150) return 'El nombre debe tener al menos 3 caracteres y un máximo de 150';
  return null;
}

const validateLastName = (lastName) => {
  if(!lastName) return 'El apellido es requerido';
  if(lastName.length < 3 || lastName.length > 150) return 'El apellido debe tener al menos 3 caracteres y un máximo de 150';
}

const validateEmail = (email) => {
  if(email && !validator.isEmail(email)) return 'El email no es válido';
}

const validatePhone = (phone) => {
  if(phone && !validator.isNumeric(phone)) return 'El teléfono no es válido';
  if(phone){
    if(phone.length < 8 || phone.length > 12) return 'El teléfono debe tener al menos 8 caracteres y un máximo de 12';
  }
}

const validatePeopleQuantity = (peopleQuantity) => {
  if(!peopleQuantity) return 'La cantidad es requerida';
  if(peopleQuantity < 1 || peopleQuantity > 10) return 'La cantidad debe ser mayor a 0 y menor a 10';
}

const validateRoomNumber = (roomNumber) => {
  if(!roomNumber) return 'El número de habitación es requerido';
  if(roomNumber.length < 3 || roomNumber.length > 10) return 'El número de habitación debe tener al menos 3 caracteres y un máximo de 10';
}

const validateDate = (date) => {
  if(!date) return 'La fecha es requerida';
  if(!validator.isDate(date)) return 'La fecha no es válida';
  if(date < new Date().toISOString().slice(0,10)) return 'La fecha no puede ser anterior a la fecha actual';
}

const validateTime = (time) => {
  if(!time) return 'El horario es requerido';
}
const validateOrigin = (origin) => {
  if(!origin) return 'El origen es requerido';
  if(origin.length < 3 || origin.length > 150) return 'El origen debe tener al menos 3 caracteres y un máximo de 150';

}
const validateDestination = (destination) => {
  if(!destination) return 'El destino es requerido';
  if(destination.length < 3 || destination.length > 150) return 'El destino debe tener al menos 3 caracteres y un máximo de 150';
}

const validatePrice = (price) => {
  if(!validator.isNumeric(price.toString())) return 'El precio es requerido';
  if(parseFloat(price) < 0) return 'El precio no puede ser negativo';
}

const validateCommission = (commission) => {
  if(!validator.isNumeric(commission.toString())) return 'La comisión es requerida';
  if(parseFloat(commission) < 0) return 'La comisión no puede ser negativa';
}

const validateInfo = (info) => {
  
  if(info){
    if(info.length < 10 || info.length > 500) return 'La información debe tener al menos 10 caracteres y un máximo de 500';
  }
}