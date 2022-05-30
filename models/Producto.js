const { Schema, model } = require('mongoose');


const ProductSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatario']
    },
    imagen: {
        type: String,
        required: [true, 'La imagen es obligataria']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripcion es obligataria']
    },
    precio: {
        type: Number
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [true, 'La categoria es obligatoria']
    },
    cuentaAtras: {
        type: String,
        required: false
    }
});

module.exports = model('Producto', ProductSchema);