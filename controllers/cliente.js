const { response, request } = require('express');
const Cliente = require('../models/cliente');
const moment = require('moment')
const clientesPost = async (req, res = response) => {
    const {nombrePropietario, nombreMascota, email, fechaCita, sintomas} = req.body;
    const usuario = req.usuarioAutenticado._id;

    const cliente = new Cliente({nombrePropietario, nombreMascota, email, fechaCita, sintomas, usuario});

    try {
        await cliente.save();
        res.json(cliente)
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: "No se pudo crear el cliente."
        })
    }
}


const clientesGet = async (req, res = response) => {
    try {
        const [clientes, total] = await Promise.all([
            Cliente.find({ usuario: req.usuarioAutenticado._id }),
            Cliente.countDocuments({usuario: req.usuarioAutenticado._id})
        ])
        res.json({
            total,
            clientes
        })
    } catch (error) {
        console.log("Error: ", error);
    }
}


const clientesPut = async (req, res = response) => {
    const {id} = req.params;
    const {_id, __v, usuario, ...resto} = req.body;

    
    try {
        const clienteActualizado = await Cliente.findByIdAndUpdate(id, resto);
        res.json(clienteActualizado);
    } catch (error) {
        console.log("Error: ", error);
    }
}


const clientesDelete = async (req, res = response) => {
    const {id} = req.params;
    try {
        const clienteEliminado = await Cliente.findByIdAndDelete(id);
        res.json(clienteEliminado);
    } catch (error) {
        console.log("Error: ", error);
    }
}

module.exports = {
    clientesGet,
    clientesPost, 
    clientesPut, 
    clientesDelete
}