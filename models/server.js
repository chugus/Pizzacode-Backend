const express = require('express');
const cors = require('cors');

const dbConnection = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            productos: '/api/productos',
            categorias: '/api/categorias',
            tarjetas: '/api/tarjetas',
            direcciones: '/api/direcciones',
            pagos: '/api/pagos',
        }

        // Conectar a DB
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi app
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.tarjetas, require('../routes/tarjetas'));
        this.app.use(this.paths.direcciones, require('../routes/direcciones'));
        this.app.use(this.paths.pagos, require('../routes/pagos'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;