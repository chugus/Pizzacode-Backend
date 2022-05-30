const { Router } = require('express');
const { check } = require("express-validator");

const { existePagoPorID } = require('../helpers/db-validators')
const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');

const { pagoGet, pagosGet, pagosPost, pagosPut, pagosDelete } = require('../controllers/pagos');


const router = Router();

router.get('/', pagosGet);

router.get('/:id', [
    check('id', 'No es un ID correcto').isMongoId(),
    check('id').custom(existePagoPorID),
    validarCampos
], pagoGet);

router.post('/', [
    validarJWT,
    check('fecha', 'La fecha es obligatoria'),
    check('productos', 'Los productos son obligatorios'),
    check('total', 'El monto toal es obligatorio'),
    validarCampos
], pagosPost);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID correcto').isMongoId(),
    check('id').custom(existePagoPorID),
    validarCampos
], pagosPut);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID correcto').isMongoId(),
    check('id').custom(existePagoPorID),
    validarCampos
], pagosDelete);



module.exports = router;