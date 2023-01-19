const {Router} = require('express');
const usuarioRouter = Router();
const checkAuth = require('../middlewares/checkAuth')
const {usuariosPost, usuariosGet, usuariosGetById, perfil} = require('../controllers/usuario');


usuarioRouter.get('/', usuariosGet);

usuarioRouter.get('/perfil',[
    checkAuth,
], perfil);

// usuarioRouter.get('/:id');

// usuarioRouter.put('/:id');

// usuarioRouter.delete('/:id');

usuarioRouter.post('/', usuariosPost);

module.exports = usuarioRouter