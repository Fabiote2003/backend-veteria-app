const {Schema, model} = require('mongoose');

const clienteSchema = Schema({
    nombrePropietario: {
        type: String,
        required: [true, "El nombre del dueño de la mascota es obligatorio"]
    },
    nombreMascota: {
        type: String,
        required: [true, "El nombre de la mascota es obligatorio"]
    },
    email: {
        type: String,
        required: [true, "El email es obligatorio"],
        unique:false
    },
    telefono:{
        type: String, 
    },
    fechaCita: {
        type: Date,
        required: [true, "La fecha de la cita es obligatoria"]
    },
    sintomas: {
        type: String,
        required: [true, "Los sintomas son obligatorios."]
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

}) 

module.exports = model( 'Cliente', clienteSchema );
