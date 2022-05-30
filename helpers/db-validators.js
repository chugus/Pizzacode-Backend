const Usuario = require("../models/Usuario");
const Producto = require("../models/Producto");
const Categoria = require("../models/Categoria");
const Direccion = require("../models/Direccion");
const Tarjeta = require("../models/Tarjeta");
const Pago = require("../models/Pago");


const existeEmail = async (correo = '') => {
    const existeUsuarioEmail = await Usuario.findOne({ correo });
    if (existeUsuarioEmail) {
        throw new Error(`El correo: ${correo} ya está registrado`);
    }
}

const existeUsuarioPorID = async (id) => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const existeUsuario = await Usuario.findById(id);

        if (!existeUsuario) {
            throw new Error(`El id no existe ${id}`);
        }
    } else {
        throw new Error(`${id} no es un ID válido`);
    }

}

const existeProductoPorID = async (id) => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const existeProducto = await Producto.findById(id);

        if (!existeProducto) {
            throw new Error(`El id no existe ${id}`);
        }
    } else {
        throw new Error(`${id} no es un ID válido`);
    }

}

const existeCategoriaPorID = async (id) => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const existeCategoria = await Categoria.findById(id);

        if (!existeCategoria) {
            throw new Error(`El id no existe ${id}`);
        }
    } else {
        throw new Error(`${id} no es un ID válido`);
    }

}

const existeTarjetaPorID = async (id) => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const existeTarjeta = await Tarjeta.findById(id);

        if (!existeTarjeta) {
            throw new Error(`El id no existe ${id}`);
        }
    } else {
        throw new Error(`${id} no es un ID válido`);
    }

}

const existeDireccionPorID = async (id) => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const existeDireccion = await Direccion.findById(id);

        if (!existeDireccion) {
            throw new Error(`El id no existe ${id}`);
        }
    } else {
        throw new Error(`${id} no es un ID válido`);
    }

}

const existePagoPorID = async (id) => {
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
        const existePago = await Pago.findById(id);

        if (!existePago) {
            throw new Error(`El id no existe ${id}`);
        }
    } else {
        throw new Error(`${id} no es un ID válido`);
    }

}


module.exports = {
    existeEmail,
    existeUsuarioPorID,
    existeProductoPorID,
    existeCategoriaPorID,
    existeTarjetaPorID,
    existeDireccionPorID,
    existePagoPorID
}