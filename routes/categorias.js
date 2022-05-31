const { Router } = require('express');
const { check } = require("express-validator");

const { existeCategoriaPorID } = require('../helpers/db-validators')
const validarCampos = require('../middlewares/validar-campos');
const validarJWT = require('../middlewares/validar-jwt');

const { categoriaGet, categoriasGet, categoriasPost, categoriasPut, categoriasDelete } = require('../controllers/categorias');


const router = Router();

router.get('/', categoriasGet);

router.get('/:id', [
    check('id', 'No es un ID correcto').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
], categoriaGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('titulo', 'El titulo es obligatorio').not().isEmpty(),
    validarCampos
], categoriasPost);

router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID correcto').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
], categoriasPut);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID correcto').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos
], categoriasDelete);


module.exports = router;