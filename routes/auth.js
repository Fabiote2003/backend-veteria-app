const { Router } = require('express');
const {login, isLoggedIn, logout} = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

router.post('/login', login);
router.get('/is_logged_in',[
    validarJWT
], isLoggedIn);

module.exports = router;