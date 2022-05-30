const { Router } = require('express');
const { check } = require("express-validator");

const { existeDireccionPorID, existeUsuarioPorID } = require('../helpers/db-validators')
const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');

const {  direccionGet, direccionesGet, direccionesPost, direccionesPut, direccionesDelete } = require('../controllers/direcciones');


const router = Router();

router.get('/', direccionesGet);

router.get('/:id', [
    check('id', 'No es un ID correcto').isMongoId(),
    check('id').custom(existeDireccionPorID),
    validarCampos
], direccionGet);

router.post('/', [
    validarJWT,
    check('calle', 'La calle es obligatoria').not().isEmpty(),
    check('numero', 'El número es obligatorio').not().isEmpty(),
    check('colonia', 'La colonia es obligatoria').not().isEmpty(),
    check('ciudad', 'La ciudad es obligatoria').not().isEmpty(),
    check('estado', 'El estado es obligatorio').not().isEmpty(),
    check('codigoPostal', 'El CP es obligatorio').not().isEmpty(),
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    check('usuario').custom(existeUsuarioPorID),
    validarCampos
], direccionesPost);

router.put('/:id', [
    validarJWT,
    check('id').custom(existeDireccionPorID),
    validarCampos
], direccionesPut);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID correcto').isMongoId(),
    check('id').custom(existeDireccionPorID),
    validarCampos
], direccionesDelete);


module.exports = router;