const Usuarios = require('../classes/usuarios')

const usuarios = new Usuarios()

const sockets = (socket) => {

    // console.log('cliente conectado', socket.id)

    socket.emit('crearMensaje', {
        ok: true,
        msg: 'Bienvenido a esta aplicación de chat!'
    })

    socket.on('disconnect', () => {
        usuarios.deleteUsuario(socket.id)

        // console.log('cliente desconectado', socket.id)

    })
    
    socket.on('entrarChat', (data, callback) => {
        if(!data.nombre || !data.sala){
            return callback({
                ok: false,
                msg: 'El nombre es requerido!'
            })
        }

        socket.join(data.sala)
        
        usuarios.agregarUsuario(socket.id, data.nombre, data.sala)

        socket.broadcast.to(data.sala).emit('listaPersonas', usuarios.getUsuariosSala(data.sala))
        socket.broadcast.to(data.sala).emit('crearMensaje', `El usuario ${data.nombre} se ha unido a la sala.`)

        return callback(usuarios)
    })

    socket.on('enviarMensaje', (data, callback) => {
        const usuario = usuarios.getUsuario(socket.id);

        const mensaje = {nombre: usuario.nombre, mensaje: data.mensaje, fecha: new Date().getTime()}
        // console.log(usuarios.getUsuario(socket.id))
        socket.broadcast.to(usuario.sala).emit('enviarMensaje', mensaje)

        callback(mensaje)
    })
}

module.exports = {
    sockets
}