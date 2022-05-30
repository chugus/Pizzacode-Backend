const bcryptjs = require('bcryptjs');

const Categoria = require('../models/Categoria');
const Producto = require('../models/Producto');


const productoGet = async (req, res) => {
    const producto = await Producto.findById(req.params.id);

    res.json({producto});

}

const productosGet = async (req, res) => {

    const [total, productos] = await Promise.all([
        Producto.countDocuments(),
        Producto.find()
    ]);

    res.json({
        total,
        productos
    });

}

const productosPost = async (req, res) => {

    const { nombre, imagen, descripcion, precio, categoria, cuentaAtras } = req.body;
    const producto = new Producto({ nombre, imagen, descripcion, precio, categoria, cuentaAtras });

    const agregarProductoACategoria = async () => {
        const categoriaModify = await Categoria.findById(categoria);
        
        categoriaModify.productos.push(producto);
        await categoriaModify.save();
    }

    agregarProductoACategoria();

    // Guardar en la DB
    await producto.save();

    res.json({
        producto
    });
}

const productosPut = async (req, res) => {

    const id = req.params.id;
    const { _id, ...resto } = req.body;

    const producto = await Producto.findByIdAndUpdate(id, resto);

    res.json(producto);
}

const productosDelete = async (req, res) => {
    const producto = await Producto.findByIdAndDelete(req.params.id);

    res.json({ producto });
}



module.exports = {
    productoGet,
    productosGet,
    productosPost,
    productosPut,
    productosDelete
}