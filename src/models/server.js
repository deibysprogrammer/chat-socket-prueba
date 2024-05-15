const express = require('express')
const cors = require('cors')
const http = require('http')
const socketIO = require('socket.io')
const { sockets } = require('../sockets/socket-controller');


class Server{
    constructor(){
        this.app = express()
        this.server = http.createServer(this.app);
        this.io = socketIO(this.server);
        this.port = process.env.PORT
        this.paths = {
            // TODO: Rutas
        }

        this.middlewares()

        // TODO: ejecucion de configuracion de rutas

        this.sockets()
    }

    // TODO: Conexion con base de datos

    // TODO: Configuración de rutas

    sockets(){
        this.io.on('connection', sockets)
    }

    middlewares(){
        this.app.use(express.json())
        this.app.use(cors())
        this.app.use(express.static('src/public'))
    }

    listen(){
        this.server.listen(this.port, () => {
            console.log('Servidor corriendo en puerto: ' + this.port)
        })
    }
}

module.exports = Server