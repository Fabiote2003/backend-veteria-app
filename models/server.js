const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config')
class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.clientesPath = '/api/clientes';
        this.authPath = '/api/auth';

        //Conexión a la base de datos
        this.conectarDB();

        //Middlewares
        this.middlewares();

        this.routes();

    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());

        //Lectura y parseo del body
        this.app.use(express.json())

    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuario'));
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.clientesPath, require('../routes/cliente'));
    }
    
    listen() {
        this.app.listen(this.port);
    }

}

module.exports = Server