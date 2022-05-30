const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignin, validarTokenUsuario } = require('../controllers/auth');

const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');

const router = Router();


router.post('/login', [
    check('correo', 'El correo es obligatario').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.post('/google', [
    check('id_token', 'El ID_TOKEN es obligatorio').not().isEmpty(),
    validarCampos
], googleSignin);


router.get('/',[
    validarJWT
], validarTokenUsuario );


module.exports = router;