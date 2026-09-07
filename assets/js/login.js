const formLogin = document.querySelector("#formulario-login");
const correoLogin = document.querySelector("#correo-login");
const passLogin = document.querySelector("#pass-login");
const errorCorreo = document.querySelector("#error-correo-login");
const errorPass = document.querySelector("#error-pass-login");
const msgLogin = document.querySelector("#mensaje-login");

if (formLogin) {
  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();
    let esValido = true;

    const email = correoLogin.value.trim().toLowerCase();
    if (email === "") {
      errorCorreo.textContent = "El correo es requerido.";
      correoLogin.classList.add("campo-invalido");
      esValido = false;
    } else if (email.length > 100) {
      errorCorreo.textContent = "Máximo 100 caracteres.";
      correoLogin.classList.add("campo-invalido");
      esValido = false;
    } else if (
      !email.endsWith("@duoc.cl") &&
      !email.endsWith("@profesor.duoc.cl") &&
      !email.endsWith("@gmail.com")
    ) {
      errorCorreo.textContent = "Solo se permiten correos @duoc.cl, @profesor.duoc.cl y @gmail.com";
      correoLogin.classList.add("campo-invalido");
      esValido = false;
    } else {
      errorCorreo.textContent = "";
      correoLogin.classList.remove("campo-invalido");
    }

    const pass = passLogin.value;
    if (pass === "") {
      errorPass.textContent = "La contraseña es requerida.";
      passLogin.classList.add("campo-invalido");
      esValido = false;
    } else if (pass.length < 4 || pass.length > 10) {
      errorPass.textContent = "Debe tener entre 4 y 10 caracteres.";
      passLogin.classList.add("campo-invalido");
      esValido = false;
    } else {
      errorPass.textContent = "";
      passLogin.classList.remove("campo-invalido");
    }

    if (esValido) {
      msgLogin.textContent = "Credenciales válidas. Redirigiendo a Administración...";
      msgLogin.style.color = "var(--color-primario)";
      setTimeout(function () {
        window.location.href = "admin/index.html";
      }, 1000);
    } else {
      msgLogin.textContent = "Revise los campos marcados.";
      msgLogin.style.color = "var(--color-peligro)";
    }
  });
}