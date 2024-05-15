const ulUsuarios = $("#usuarios");
const form = $("#enviarMensaje");
const cajaTexto = $("#cajaTexto");
const chatBox = $("#chatBox");

const renderizarUsuarios = (usuarios, sala) => {
  let html = "";

  // renderizar salas
  html += '<li class="list-group-item d-flex border-0 border-bottom rounded-0"';
  html += ' style="cursor: pointer;"';
  html += ' onclick="alert("hola")">';
  html += "<div>";
  html += `<p class="m-0 fs-6">${sala}</p>`;
  html += "</div>";
  html += "</li>";

  // renderizar usuarios
  for (let i = 0; i < usuarios.length; i++) {
    html +=
      '<li class="list-group-item d-flex border-0 border-bottom rounded-0"';
    html += ' style="cursor: pointer;"';
    html += ' onclick="alert("hola")">';
    html +=
      '<img src="../../assets/no-user-image.webp" class="rounded-circle me-2"';
    html += ' alt="no_user_image" width="40" height="40"/>';
    html += "<div>";
    html += `<p class="m-0 fs-6">${usuarios[i].nombre}</p>`;
    html += `<span class="text-success" style="font-size: 12px; display: ${
      usuarios ? "" : "none"
    }">online</span>`;
    html += `<span class="text-danger" style="font-size: 12px; display: ${
      usuarios ? "none" : ""
    }">offline</span>`;
    html += "</div>";
    html += "</li>";
  }

  ulUsuarios.html(html);
};

const renderizarMensajes = (mensaje, option) => {
    let html = ''

    const fecha = new Date(mensaje.fecha)
    const hora = fecha.getHours() + ':' + fecha.getMinutes()

    if(option){
      html += '<div class="d-flex mb-3">'
      html += '<img src="../../assets/no-user-image.webp" class="rounded-circle me-3"'
      html += ' alt="no_user_image" width="40" height="40"/>'
      html += '<div style="max-width: 70%">'
      html += `<div class="m-0 fs-6">${mensaje.nombre}</div>`
      html += '<div class="bg-primary-subtle text-break p-2 rounded-2">'
      html += `${mensaje.mensaje}</div>`
      html += `<p style="font-size: 12px;" class="m-0">${hora}</p>`
      html += '</div>'
      html += '</div>'
    } else {
      html += '<div class="d-flex flex-row-reverse mb-3">'
      html += '<img src="../../assets/no-user-image.webp" class="rounded-circle ms-3"'
      html += ' alt="no_user_image" width="40" height="40"/>'
      html += '<div style="max-width: 70%">'
      html += `<p class="m-0 fs-6 text-end">${mensaje.nombre}</p>`
      html += '<div class="bg-secondary-subtle text-break p-2 rounded-2"'
      html += `>${mensaje.mensaje}</div>`
      html += `<p style="font-size: 12px;" class="m-0 text-end">${hora}</p>`
      html += '</div>'
      html += '</div>'
    }

    chatBox.append(html)
};

form.on("submit", function (e) {
  e.preventDefault();

  if (cajaTexto.val().trim().length === 0) {
    return;
  }

  socket.emit("enviarMensaje", {mensaje: cajaTexto.val()}, (resp) => {
    renderizarMensajes(resp, true);
    cajaTexto.val('')
  });
});
