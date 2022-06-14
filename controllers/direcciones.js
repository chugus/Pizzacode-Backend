const bcryptjs = require('bcryptjs');

const Usuario = require('../models/Usuario');
const Direccion = require('../models/Direccion');


const direccionGet = async (req, res) => {
    const direccion = await Direccion.findById(req.params.id);

    res.json(direccion);
}

const direccionesGet = async (req, res) => {

    const [total, direcciones] = await Promise.all([
        Direccion.countDocuments(),
        Direccion.find()
    ]);

    res.json({
        total,
        direcciones
    });

}

const direccionesPost = async (req, res) => {

    const { calle, numero, colonia, ciudad, estado, codigoPostal, usuario } = req.body;
    const direccion = new Direccion({ calle, numero, colonia, ciudad, estado, codigoPostal, usuario });

    const agregarDireccionAUsuario = async () => {
        const usuarioToModify = await Usuario.findById(usuario);

        usuarioToModify.direcciones.push(direccion);
        await usuarioToModify.save();
    }

    agregarDireccionAUsuario();

    // Guardar en la DB
    await direccion.save();

    res.json({
        direccion
    });
}

const direccionesPut = async (req, res) => {

    const id = req.params.id;
    const { _id, ...resto } = req.body;

    const direccion = await Direccion.findByIdAndUpdate(id, resto);

    res.json(direccion);
}

const direccionesDelete = async (req, res) => {
    const direccion = await Direccion.findById(req.params.id);

    const eliminarDireccionAUsuario = async () => {
        const usuarioToModify = await Usuario.findById(direccion.usuario);

        usuarioToModify.direcciones.splice(usuarioToModify.direcciones.indexOf(direccion._id), 1);
        await usuarioToModify.save();
    }

    eliminarDireccionAUsuario();
    const direccionEliminada = await Direccion.findByIdAndDelete(req.params.id);

    res.json(direccionEliminada);
}



module.exports = {
    direccionGet,
    direccionesGet,
    direccionesPost,
    direccionesPut,
    direccionesDelete
}