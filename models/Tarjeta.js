const { Schema, model } = require('mongoose');

const TarjetaSchema = Schema({
    numero: {
        type: String,
        required: [true, 'El número es obligatoria']
    },
    cvv: {
        type: String,
        required: [true, 'El CVV es obligatoria']
    },
    fechaExpiracion: {
        type: String,
        required: [true, 'La fecha de expiración es obligatoria']
    },
    nombre: {
        type: String,
        required: [true, 'El nombre del propietario es obligatoria']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'El usuario debe estar registrado']
    }
});

module.exports = model('Tarjeta', TarjetaSchema);