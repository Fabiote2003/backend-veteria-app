const Usuario = require("../models/usuario");
const jwt = require('jsonwebtoken');

const checkAuth = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.SECRETOPRIVATEKEY);

            req.usuario = await Usuario.findById(decoded.uid).select(
                "-password -__v"
            )

            return next();
        } catch (error) {
            return res.status(401).json({
                msg: "Token no válido"
            })
        }
    }
}

module.exports = checkAuth;