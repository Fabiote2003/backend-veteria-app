const {Schema, model} = require('mongoose');

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    apellido: {
        type: String,
        required: [true, "El apellido es obligatorio"]
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique: true
    }, 
    password: {
        type: String, 
        required: [true, "La contraseña es obligatoria"]
    },
    estado: {
        type: Boolean,
        default: true
    }

}) 

module.exports = model( 'Usuario', usuarioSchema );
