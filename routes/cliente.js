const {Router} = require('express');
const clienteRouter = Router();
const {clientesGet, clientesGetById, clientesPost, clientesPut, clientesDelete} = require('../controllers/cliente');
const {validarJWT} = require('../middlewares/validar-jwt')
clienteRouter.get('/',[
    validarJWT
], clientesGet);

clienteRouter.put('/:id',[
    validarJWT
], clientesPut);

clienteRouter.delete('/:id',[
    validarJWT
], clientesDelete);

clienteRouter.post('/',[
    validarJWT
], clientesPost);



module.exports = clienteRouter;
