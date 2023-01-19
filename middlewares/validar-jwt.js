const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario');

const validarJWT = async ( req = request, res = response, next ) => {
    const token = req.header('x-token');

    //Comprobamos si existe el token
    if(!token) {
        return res.status(401).json({
            msg: "No hay token en la petición"
        })
    }

    try {
        
        const {uid} = jwt.verify( token, process.env.SECRETOPRIVATEKEY );
        const usuarioAutenticado = await Usuario.findById(uid);
        
        if(!usuarioAutenticado) {
            return res.status(401).json({
                msg: "Token no válido - usuario no existe en la base de datos"
            })
        }
        
        req.usuarioAutenticado = usuarioAutenticado;
        next();
        
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: "Token no valido"
        })
    }

}

module.exports = {
    validarJWT
}