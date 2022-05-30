const { Schema, model } = require('mongoose');


const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatario']
    },
    titulo: {
        type: String,
        required: [true, 'El titulo es obligatario']
    },
    productos: {
        type: [Schema.Types.ObjectId],
        ref: 'Producto'
    }
});

module.exports = model('Categoria', CategoriaSchema);