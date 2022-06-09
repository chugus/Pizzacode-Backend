const bcryptjs = require('bcryptjs');
const Usuario = require('../models/Usuario');


const usuarioGet = async (req, res) => {
    const usuario = await Usuario.findById(req.params.id);

    res.json(usuario);
}

const usuariosGet = async (req, res) => {

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(),
        Usuario.find()
    ]);

    res.json({
        total,
        usuarios
    });

}

const usuariosPost = async (req, res) => {

    const { nombre, correo, password, telefono } = req.body;
    const usuario = new Usuario({ nombre, correo, password, telefono });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en la DB
    await usuario.save();

    // Generar el JWT
    const token = await generarJWT(usuario._id);

    res.json({
        usuario,
        token
    })
}

const usuariosPut = async (req, res) => {

    const id = req.params.id;
    const { _id, password, google, ...resto } = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const usuariosDelete = async (req, res) => {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);

    res.json({ usuario });
}



module.exports = {
    usuarioGet,
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}