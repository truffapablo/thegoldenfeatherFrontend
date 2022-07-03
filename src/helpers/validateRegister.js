import validator from "validator";

export const validateRegister = (user) => {
    const errors = {}
    const {name, email, password, password2} = user;

    if(validateName(name)) errors.name = validateName(name);
    if(validateEmail(email)) errors.email = validateEmail(email);
    if(validatePassword(password)) errors.password = validatePassword(password)
    if(validatePassword(password2)) errors.password2 = validatePassword(password2)
    if(validatePasswordEquality(password,password2)) {
        errors.password = validatePasswordEquality(password,password2);
        errors.password2 = validatePasswordEquality(password,password2);
    }

    return errors;
}

const validateName = (name) => {
    if(!name) return 'El nombre es obligatorio';
    if(name.length < 2 || name.length > 150) return 'El nombre debe tener un mínimo de 2 caracteres y máximo de 150.'
}

const validateEmail = (email) => {
    if(!email) return 'El email es obligatorio.';
    if(!validator.isEmail(email)) return 'El email no es válido.';
}

const validatePassword = (password) => {
    if(!password) return 'La contraseña es obligatoria.'
}

const validatePasswordEquality = (password, password2) => {
    if(password !== password2) return 'Las contraseñas tienen que ser iguales.'
}