const { Router } = require('express');
const { check } = require("express-validator");

const { existeTarjetaPorID } = require('../helpers/db-validators')
const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');

const { tarjetaGet, tarjetasGet, tarjetasPost, tarjetasPut, tarjetasDelete } = require('../controllers/tarjetas');


const router = Router();

router.get('/', tarjetasGet);

router.get('/:id', [ 
    check('id', 'No es un ID correcto').isMongoId(),
    check('id').custom(existeTarjetaPorID),
    validarCampos
], tarjetaGet);

router.post('/', [
    validarJWT,
    check('numero', 'El número es obligatorio').not().isEmpty(),
    check('cvv', 'El CVV es obligatorio').not().isEmpty(),
    check('fechaExpiracion', 'La fecha de expiración es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre del propietario es obligatorio').not().isEmpty(),
    check('usuario', 'El usuario es obligatorio').not().isEmpty(),
    validarCampos
], tarjetasPost);

router.put('/:id', [
    validarJWT,
    check('id').custom(existeTarjetaPorID),
    validarCampos
], tarjetasPut);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID correcto').isMongoId(),
    check('id').custom(existeTarjetaPorID),
    validarCampos
], tarjetasDelete);


module.exports = router;