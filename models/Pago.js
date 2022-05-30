const { Schema, model } = require('mongoose');

const PagoSchema = Schema({
    fecha: {
        type: String,
        required: [true, 'La fecha es obligatoria']
    },
    productos: {
        type: [],
        required: [true, 'Los productos comprados son obligatorios']
    },
    total: {
        type: Number,
        required: [true, 'El monto total es obligatorio']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    invitado: {
        type: Boolean,
        default: false
    },
    efectivo: {
        type: String
    },
    tarjeta: {
        type: String
    }
});

module.exports = model('Pago', PagoSchema);