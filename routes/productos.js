const { Router } = require('express');
const { check } = require("express-validator");

const { existeProductoPorID, existeCategoriaPorID } = require('../helpers/db-validators')
const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');

const {  productoGet, productosGet, productosPost, productosPut, productosDelete } = require('../controllers/productos');


const router = Router();

router.get('/', productosGet);

router.get('/:id', [
    check('id').custom(existeProductoPorID)
], productoGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('imagen', 'La imagén es obligatorio').not().isEmpty(),
    check('descripcion', 'La descripción es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    check('categoria').custom(existeCategoriaPorID),
    validarCampos
], productosPost);

router.put('/:id', [
    validarJWT,
    check('id').custom(existeProductoPorID),
    validarCampos
], productosPut);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID correcto').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
], productosDelete);


module.exports = router;