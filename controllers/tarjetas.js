const bcryptjs = require('bcryptjs');

const Usuario = require('../models/Usuario');
const Tarjeta = require('../models/Tarjeta');


const tarjetaGet = async (req, res) => {
    const tarjeta = await Tarjeta.findById(req.params.id);

    res.json(tarjeta);
}

const tarjetasGet = async (req, res) => {

    const [total, tarjetas] = await Promise.all([
        Tarjeta.countDocuments(),
        Tarjeta.find()
    ]);

    res.json({
        total,
        tarjetas
    });

}

const tarjetasPost = async (req, res) => {

    const { numero, cvv, fechaExpiracion, nombre, usuario } = req.body;
    const tarjeta = new Tarjeta({ numero, cvv, fechaExpiracion, nombre, usuario });

    const agregarTarjetaAUsuario = async () => {
        const usuarioToModify = await Usuario.findById(usuario);

        usuarioToModify.cards.push(tarjeta);
        await usuarioToModify.save();
    }

    agregarTarjetaAUsuario();

    // Guardar en la DB
    await tarjeta.save();

    res.json({
        tarjeta
    });
}

const tarjetasPut = async (req, res) => {

    const id = req.params.id;
    const { _id, ...resto } = req.body;

    const tarjeta = await Tarjeta.findByIdAndUpdate(id, resto);

    res.json(tarjeta);
}

const tarjetasDelete = async (req, res) => {
    const tarjeta = await Tarjeta.findById(req.params.id);

    const eliminarTarjetaAUsuario = async () => {
        const usuarioToModify = await Usuario.findById(tarjeta.usuario);

        usuarioToModify.cards.splice(usuarioToModify.cards.indexOf(tarjeta._id), 1);
        await usuarioToModify.save();
    }

    eliminarTarjetaAUsuario();
    const tarjetaEliminada = await Tarjeta.findByIdAndDelete(req.params.id);

    res.json(tarjeta);
}



module.exports = {
    tarjetaGet,
    tarjetasGet,
    tarjetasPost,
    tarjetasPut,
    tarjetasDelete
}