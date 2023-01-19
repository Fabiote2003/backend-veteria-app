const { response, json } = require("express");
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs'); 
const {generarJWT} = require('../helpers/generar-jwt');
const jwt = require('jsonwebtoken')

const login = async (req, res = response) => {
    
    //Obtenemos del body el email y la password
    const {email, password} = req.body;

    try {

        //Validamos el email
        const usuario = await Usuario.findOne( {email} );

        if(!usuario) {
            return res.status(400).json({
                msg: "Email o Contraseña son incorrectos."
            })
        }

        //Validamos la contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if(!validPassword) {
            return res.status(400).json({
                msg: "Email o Contraseña son incorrectos."
            })
        }

        //Si están validados el email y la password, GENERAMOS EL JWT
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token            
        }) 

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: "Ocurrio un error inesperado. Intentelo de nuevo en otro momento."
        })
    }
}

const isLoggedIn = (req, res) => {
    const token = req.header('x-token');
    return jwt.verify(token, process.env.SECRETOPRIVATEKEY, (err) => {
        if(err) {
            return res.json(false);
        }else {
            return res.json(true);
        }
    })
}   



module.exports = {
    login,
    isLoggedIn,
}
