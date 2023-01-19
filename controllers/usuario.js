const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const usuariosGet = async (req, res = response) => {
    try {
        const usuarios = await Usuario.find();
        res.json({
            usuarios,
        })
    } catch (error) {
        res.status(404).json({
            msg: "Usuarios no podidon ser encontrados"
        })
    }
} 

const usuariosGetById = async (req, res = response) => {
    const {id} = req.params;
    try {

        const usuario = await Usuario.findById(id);

        if(usuario) {
            res.json({
                usuario
            })
        }

    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg: `No existe usuario con el id ${id}`
        })
    }
} 

const usuariosPost = async (req = request, res = response) => {
    const {nombre, apellido, email, password} = req.body;

    const usuario = new Usuario({
        nombre, 
        apellido, 
        email, 
        password
    });

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);


    await usuario.save();

    res.json({
        msg: "Usuario Creado correctamente",
        usuario,
    })
} 

const perfil = async (req, res = response) => {
    const {usuario} = req;

    res.json(usuario);
}

const usuariosPut = (req, res = response) => {
    
} 

const usuariosDelete = (req, res = response) => {
    
} 


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosGetById,
    perfil
}