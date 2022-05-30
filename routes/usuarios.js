const { Router } = require('express');
const { check } = require("express-validator");

const { existeEmail, existeUsuarioPorID } = require('../helpers/db-validators');
const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');

const { usuarioGet, usuariosGet, usuariosPost, usuariosPut, usuariosDelete } = require('../controllers/usuarios');


const router = Router();

router.get('/', usuariosGet);

router.get('/:id', [
    check('id', 'No es un ID correcto').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos
], usuarioGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener más de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(existeEmail),
    check('telefono', 'El teléfono es obligatorio').not().isEmpty(),
    validarCampos
], usuariosPost);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID correcto').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos
], usuariosPut);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID correcto').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos
], usuariosDelete);


module.exports = router;