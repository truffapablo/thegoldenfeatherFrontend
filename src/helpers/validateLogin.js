import validator from 'validator';

export const validateLogin = (email, password) => {

    let errors = {};

    if (validator.isEmpty(email)) {
        errors.email = 'El usuario es requerido';
    }
    if (!validator.isEmpty(email) && !validator.isEmail(email)) {
        errors.email = 'El usuario no es válido';
    }
    if (validator.isEmpty(password)) {
        errors.password = 'La contraseña es requerida';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };

}