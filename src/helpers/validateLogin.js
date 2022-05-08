import validator from 'validator';

export const validateLogin = (user, password) => {

    let errors = {};

    if (validator.isEmpty(user)) {
        errors.user = 'El usuario es requerido';
    }

    if (!validator.isEmail(user)) {
        errors.user = 'El email no es valido';
    }

    if (validator.isEmpty(password)) {
        errors.password = 'La contraseña es requerida';
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    };

}