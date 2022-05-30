const bcryptjs = require('bcryptjs');

const Usuario = require('../models/Usuario');
const generarJWT = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async (req, res) => {

    const { correo, password } = req.body;

    try {

        // Verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario._id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'habla con el admin'
        })
    }


}

const googleSignin = async (req, res, next) => {

    const { id_token } = req.body;

    try {
        const { correo, nombre } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ':F',
                google: true
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Token de Google no es válido'
        })
    }


}

const validarTokenUsuario = async (req, res) => {

    // Generar el JWT
    const token = await generarJWT(req.usuario._id);

    res.json({
        usuario: req.usuario,
        token: token,
    })

}


module.exports = {
    login,
    googleSignin,
    validarTokenUsuario
}