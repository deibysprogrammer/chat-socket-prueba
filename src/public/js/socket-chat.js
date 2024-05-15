const socket = io();

const params = new URLSearchParams(window.location.search);

const nombre = params.get("nombre");
const sala = params.get("sala");

const usuario = { nombre, sala };

socket.on("connect", () => {
  console.log("conectado");

  socket.emit("entrarChat", usuario, (resp) => {
    const usuario = resp.usuarios.filter((usuario) => usuario.id !== socket.id);

    renderizarUsuarios(usuario, sala);
  });
});

socket.on("crearMensaje", (payload) => {
//       const Toast = Swal.mixin({
//       toast: true,
//       position: "top-end",
//       showConfirmButton: false,
//       timer: 3000,
//       timerProgressBar: true,
//       didOpen: (toast) => {
//         toast.onmouseenter = Swal.stopTimer;
//         toast.onmouseleave = Swal.resumeTimer;
//       },
//   });
//   Toast.fire({
//       icon: "success",
//       title: payload.msg,
//   });
});

socket.on("disconnect", () => {
  console.log("desconectado");
});

socket.on("listaPersonas", (resp) => {
  const usuario = resp.filter((usuario) => usuario.id !== socket.id);

  renderizarUsuarios(usuario, sala);
});

socket.on("enviarMensaje", (resp) => {
    renderizarMensajes(resp, false);
});

// lblOnline.style.display = "none";
// lblOffline.style.display = "";

// lblOffline.style.display = "none";
// lblOnline.style.display = "";

// const lblOnline = document.querySelector("#lblOnline");
// const lblOffline = document.querySelector("#lblOffline");

// const inputMensaje = document.querySelector("#inputMensaje");
// const btnEnviar = document.querySelector("#btnEnviar");

// btnEnviar.addEventListener('click', () => {
//     const mensaje = inputMensaje.value

//     socket.emit('enviar-mensaje', mensaje, (id) => {
//         console.log(id)
//     })
// })
