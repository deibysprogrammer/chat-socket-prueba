class Usuarios {
    constructor(){
        this.usuarios = []
    }

    agregarUsuario(id, nombre, sala){
        this.usuarios.push({id, nombre, sala})

        return this.usuarios
    }

    getUsuarios() {
        return this.usuarios;
    }

    getUsuariosSala(sala) {
        return this.usuarios.filter(usuario => usuario.sala === sala)
    }

    getUsuario(id){
        return this.usuarios.filter(usuario => usuario.id === id)[0]
    }

    deleteUsuario(id){
        let usuarioBorrado = this.getUsuario(id)

        this.usuarios = this.usuarios.filter(usuario => usuario.id !== id)

        return usuarioBorrado
    }
}

module.exports = Usuarios