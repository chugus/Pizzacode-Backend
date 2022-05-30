const { Schema, model } = require('mongoose');

const DireccionSchema = Schema({
    calle: {
        type: String,
        required: [true, 'La calle es obligatoria']
    },
    numero: {
        type: String,
        required: [true, 'El número de la calle es obligatoria']
    },
    colonia: {
        type: String,
        required: [true, 'La colonia es obligatoria']
    },
    ciudad: {
        type: String,
        required: [true, 'La ciudad es obligatoria']
    },
    estado: {
        type: String,
        required: [true, 'El estado es obligatoria']
    },
    codigoPostal: {
        type: String,
        required: [true, 'El CP es obligatoria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario debe estar registrado']
    }
});

module.exports = model('Direccion', DireccionSchema);