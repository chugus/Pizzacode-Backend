const { Schema, model } = require('mongoose');


const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatario']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatario'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatario'],
    },
    telefono: {
        type: String
    },
    currentDirection: {
        type: String
    },
    currentCard: {
        type: String
    },
    cards: {
        type: [Schema.Types.ObjectId],
        ref: 'Tarjeta',
        default: []
    },
    direcciones: {
        type: [Schema.Types.ObjectId],
        ref: 'Direccion',
        default: []
    },
    pagos: {
        type: [Schema.Types.ObjectId],
        ref: 'Pago',
        default: []
    },
    google: {
        type: Boolean,
        default: false
    }
});

module.exports = model('Usuario', UsuarioSchema);