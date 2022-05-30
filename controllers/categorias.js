const bcryptjs = require('bcryptjs');
const Categoria = require('../models/Categoria');


const categoriasGet = async (req, res) => {

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(),
        Categoria.find()
    ]);

    res.json({
        total,
        categorias
    });

}

const categoriasPost = async (req, res) => {

    const { nombre, titulo } = req.body;
    const categoria = new Categoria({ nombre, titulo });

    // Guardar en la DB
    await categoria.save();

    res.json({
        categoria
    });
}

const categoriasPut = async (req, res) => {

    const id = req.params.id;
    const { _id, ...resto } = req.body;

    const categoria = await Categoria.findByIdAndUpdate(id, resto);

    res.json(categoria);
}

const categoriasDelete = async (req, res) => {
    const categoria = await Categoria.findByIdAndDelete(req.params.id);

    res.json({ categoria });
}



module.exports = {
    categoriasGet,
    categoriasPost,
    categoriasPut,
    categoriasDelete
}