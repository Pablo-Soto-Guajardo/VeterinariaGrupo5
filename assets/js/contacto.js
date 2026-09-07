const formContacto = document.querySelector("#formulario-contacto");
const nombreContacto = document.querySelector("#nombre-contacto");
const correoContacto = document.querySelector("#correo-contacto");
const comentarioContacto = document.querySelector("#comentario-contacto");
const errorNombre = document.querySelector("#error-nombre-contacto");
const errorCorreo = document.querySelector("#error-correo-contacto");
const errorComentario = document.querySelector("#error-comentario-contacto");
const msgContacto = document.querySelector("#mensaje-contacto");

if (formContacto) {
  formContacto.addEventListener("submit", function (e) {
    e.preventDefault();
    let valido = true;

    const nom = nombreContacto.value.trim();
    if (nom === "") {
      errorNombre.textContent = "El nombre es requerido.";
      nombreContacto.classList.add("campo-invalido");
      valido = false;
    } else if (nom.length > 100) {
      errorNombre.textContent = "Máximo 100 caracteres.";
      nombreContacto.classList.add("campo-invalido");
      valido = false;
    } else {
      errorNombre.textContent = "";
      nombreContacto.classList.remove("campo-invalido");
    }

    const email = correoContacto.value.trim().toLowerCase();
    if (email === "") {
      errorCorreo.textContent = "El correo es requerido.";
      correoContacto.classList.add("campo-invalido");
      valido = false;
    } else if (email.length > 100) {
      errorCorreo.textContent = "Máximo 100 caracteres.";
      correoContacto.classList.add("campo-invalido");
      valido = false;
    } else if (
      !email.endsWith("@duoc.cl") &&
      !email.endsWith("@profesor.duoc.cl") &&
      !email.endsWith("@gmail.com")
    ) {
      errorCorreo.textContent = "Solo se permiten dominios @duoc.cl, @profesor.duoc.cl y @gmail.com";
      correoContacto.classList.add("campo-invalido");
      valido = false;
    } else {
      errorCorreo.textContent = "";
      correoContacto.classList.remove("campo-invalido");
    }

    const coment = comentarioContacto.value.trim();
    if (coment === "") {
      errorComentario.textContent = "El comentario es requerido.";
      comentarioContacto.classList.add("campo-invalido");
      valido = false;
    } else if (coment.length > 500) {
      errorComentario.textContent = "Máximo 500 caracteres.";
      comentarioContacto.classList.add("campo-invalido");
      valido = false;
    } else {
      errorComentario.textContent = "";
      comentarioContacto.classList.remove("campo-invalido");
    }

    if (valido) {
      msgContacto.textContent = "Mensaje enviado exitosamente a la clínica.";
      msgContacto.style.color = "var(--color-primario)";
      formContacto.reset();
    } else {
      msgContacto.textContent = "Por favor, revise los errores indicados.";
      msgContacto.style.color = "var(--color-peligro)";
    }
  });
}