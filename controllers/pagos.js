const bcryptjs = require('bcryptjs');

const Usuario = require('../models/Usuario');
const Pago = require('../models/Pago');


const pagoGet = async (req, res) => {
    const pago = await Pago.findById(req.params.id);

    res.json(pago);
}

const pagosGet = async (req, res) => {

    const [total, pagos] = await Promise.all([
        Pago.countDocuments(),
        Pago.find()
    ]);

    res.json({
        total,
        pagos
    });

}

const pagosPost = async (req, res) => {

    const { fecha, productos, total, usuario, invitado, efectivo, tarjeta } = req.body;
    const pago = new Pago({ fecha, productos, total, usuario, invitado, efectivo, tarjeta });

    const agregarPagoAUsuario = async () => {
        const usuarioToModify = await Usuario.findById(usuario);

        usuarioToModify.pagos.push(pago);
        await usuarioToModify.save();
    }

    if (!invitado) {
        agregarPagoAUsuario();
    }

    // Guardar en la DB
    await pago.save();

    res.json({
        pago
    });
}

const pagosPut = async (req, res) => {

    const id = req.params.id;
    const { _id, ...resto } = req.body;

    const pago = await Pago.findByIdAndUpdate(id, resto);

    res.json(pago);
}

const pagosDelete = async (req, res) => {
    const pago = await Pago.findByIdAndDelete(req.params.id);

    res.json({ pago });
}



module.exports = {
    pagoGet,
    pagosGet,
    pagosPost,
    pagosPut,
    pagosDelete
}