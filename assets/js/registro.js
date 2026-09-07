const formRegistro = document.querySelector("#formulario-registro");
const inputRut = document.querySelector("#rut");
const inputNombre = document.querySelector("#nombre");
const inputApellidos = document.querySelector("#apellidos");
const inputCorreo = document.querySelector("#correo");
const inputFecha = document.querySelector("#fecha-nacimiento");
const inputDireccion = document.querySelector("#direccion");
const selectRegion = document.querySelector("#region");
const selectComuna = document.querySelector("#comuna");
const inputContrasena = document.querySelector("#contrasena");
const inputConfirmarContrasena = document.querySelector("#confirmar-contrasena");
const mensajeExito = document.querySelector("#mensaje-exito");

function inicializarSelects() {
  if (!selectRegion || !selectComuna) return;

  selectRegion.replaceChildren();
  const optDef = document.createElement("option");
  optDef.value = "";
  optDef.textContent = "-- Seleccione Región --";
  selectRegion.appendChild(optDef);

  for (const reg of regionesChile) {
    const opt = document.createElement("option");
    opt.value = reg.id;
    opt.textContent = reg.nombre;
    selectRegion.appendChild(opt);
  }

  selectRegion.addEventListener("change", function () {
    selectComuna.replaceChildren();
    const optComDef = document.createElement("option");
    optComDef.value = "";
    optComDef.textContent = "-- Seleccione Comuna --";
    selectComuna.appendChild(optComDef);

    for (const reg of regionesChile) {
      if (reg.id === selectRegion.value) {
        for (const com of reg.comunas) {
          const optC = document.createElement("option");
          optC.value = com;
          optC.textContent = com;
          selectComuna.appendChild(optC);
        }
        break;
      }
    }
  });
}

function mostrarError(control, idError, mensaje) {
  const salida = document.querySelector(`#${idError}`);
  if (salida) salida.textContent = mensaje;
  control.classList.add("campo-invalido");
  control.setAttribute("aria-invalid", "true");
}

function limpiarError(control, idError) {
  const salida = document.querySelector(`#${idError}`);
  if (salida) salida.textContent = "";
  control.classList.remove("campo-invalido");
  control.removeAttribute("aria-invalid");
}

function validarRut(valor) {
  limpiarError(inputRut, "error-rut");
  const formatoRut = /^[0-9]{7,8}[0-9Kk]$/;
  if (!formatoRut.test(valor)) {
    mostrarError(inputRut, "error-rut", "RUT sin puntos ni guion, entre 7 y 9 caracteres (ej: 19011022K)");
    return false;
  }

  const cuerpo = valor.slice(0, -1);
  const digitoIngresado = valor.slice(-1).toUpperCase();
  let suma = 0;
  let multiplicador = 2;

  for (let posicion = cuerpo.length - 1; posicion >= 0; posicion--) {
    suma = suma + Number(cuerpo[posicion]) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = 11 - (suma % 11);
  let digitoCalculado = String(resto);
  if (resto === 11) digitoCalculado = "0";
  if (resto === 10) digitoCalculado = "K";

  if (digitoIngresado !== digitoCalculado) {
    mostrarError(inputRut, "error-rut", "El dígito verificador del RUN no es correcto");
    return false;
  }
  return true;
}

function validarNombre(valor) {
  limpiarError(inputNombre, "error-nombre");
  if (valor === "") {
    mostrarError(inputNombre, "error-nombre", "El nombre es requerido");
    return false;
  }
  if (valor.length > 50) {
    mostrarError(inputNombre, "error-nombre", "Máximo 50 caracteres permitidos");
    return false;
  }
  return true;
}

function validarApellidos(valor) {
  limpiarError(inputApellidos, "error-apellidos");
  if (valor === "") {
    mostrarError(inputApellidos, "error-apellidos", "Los apellidos son requeridos");
    return false;
  }
  if (valor.length > 100) {
    mostrarError(inputApellidos, "error-apellidos", "Máximo 100 caracteres permitidos");
    return false;
  }
  return true;
}

function validarCorreo(valor) {
  limpiarError(inputCorreo, "error-correo");
  if (valor === "") {
    mostrarError(inputCorreo, "error-correo", "El correo es requerido");
    return false;
  }
  if (valor.length > 100) {
    mostrarError(inputCorreo, "error-correo", "Máximo 100 caracteres permitidos");
    return false;
  }
  const dominioValido =
    valor.endsWith("@duoc.cl") ||
    valor.endsWith("@profesor.duoc.cl") ||
    valor.endsWith("@gmail.com");
  if (!dominioValido) {
    mostrarError(inputCorreo, "error-correo", "Solo dominios @duoc.cl, @profesor.duoc.cl o @gmail.com");
    return false;
  }
  return true;
}

function validarDireccion(valor) {
  limpiarError(inputDireccion, "error-direccion");
  if (valor === "") {
    mostrarError(inputDireccion, "error-direccion", "La dirección es requerida");
    return false;
  }
  if (valor.length > 300) {
    mostrarError(inputDireccion, "error-direccion", "Máximo 300 caracteres permitidos");
    return false;
  }
  return true;
}

function validarContrasena(valor) {
  limpiarError(inputContrasena, "error-contrasena");
  if (valor.length < 4 || valor.length > 10) {
    mostrarError(inputContrasena, "error-contrasena", "La contraseña debe tener entre 4 y 10 caracteres");
    return false;
  }
  return true;
}

function validarConfirmarContrasena(pass, confirmPass) {
  limpiarError(inputConfirmarContrasena, "error-confirmar-contrasena");
  if (confirmPass !== pass) {
    mostrarError(inputConfirmarContrasena, "error-confirmar-contrasena", "Las contraseñas no coinciden");
    return false;
  }
  return true;
}

function validarFecha(valor) {
  limpiarError(inputFecha, "error-fecha");
  if (valor !== "") {
    const fechaIngresada = new Date(`${valor}T00:00:00`);
    const hoy = new Date();
    if (fechaIngresada > hoy) {
      mostrarError(inputFecha, "error-fecha", "La fecha de nacimiento no puede ser futura");
      return false;
    }
  }
  return true;
}

if (formRegistro) {
  inicializarSelects();

  inputRut.addEventListener("blur", function () { validarRut(inputRut.value.trim()); });
  inputRut.addEventListener("input", function () { limpiarError(inputRut, "error-rut"); });

  inputNombre.addEventListener("blur", function () { validarNombre(inputNombre.value.trim()); });
  inputNombre.addEventListener("input", function () { limpiarError(inputNombre, "error-nombre"); });

  inputApellidos.addEventListener("blur", function () { validarApellidos(inputApellidos.value.trim()); });
  inputApellidos.addEventListener("input", function () { limpiarError(inputApellidos, "error-apellidos"); });

  inputCorreo.addEventListener("blur", function () { validarCorreo(inputCorreo.value.trim().toLowerCase()); });
  inputCorreo.addEventListener("input", function () { limpiarError(inputCorreo, "error-correo"); });

  inputDireccion.addEventListener("blur", function () { validarDireccion(inputDireccion.value.trim()); });
  inputDireccion.addEventListener("input", function () { limpiarError(inputDireccion, "error-direccion"); });

  inputContrasena.addEventListener("blur", function () { validarContrasena(inputContrasena.value); });
  inputContrasena.addEventListener("input", function () { limpiarError(inputContrasena, "error-contrasena"); });

  inputConfirmarContrasena.addEventListener("blur", function () {
    validarConfirmarContrasena(inputContrasena.value, inputConfirmarContrasena.value);
  });
  inputConfirmarContrasena.addEventListener("input", function () {
    limpiarError(inputConfirmarContrasena, "error-confirmar-contrasena");
  });

  formRegistro.addEventListener("submit", function (e) {
    e.preventDefault();

    const vRut = inputRut.value.trim();
    const vNombre = inputNombre.value.trim();
    const vApellidos = inputApellidos.value.trim();
    const vCorreo = inputCorreo.value.trim().toLowerCase();
    const vDireccion = inputDireccion.value.trim();
    const vFecha = inputFecha.value;
    const vPass = inputContrasena.value;
    const vConfirmPass = inputConfirmarContrasena.value;

    const rValido = validarRut(vRut);
    const nValido = validarNombre(vNombre);
    const aValido = validarApellidos(vApellidos);
    const cValido = validarCorreo(vCorreo);
    const dValido = validarDireccion(vDireccion);
    const fValida = validarFecha(vFecha);
    const pValida = validarContrasena(vPass);
    const cpValida = validarConfirmarContrasena(vPass, vConfirmPass);

    const formValido = rValido && nValido && aValido && cValido && dValido && fValida && pValida && cpValida;

    if (!formValido) {
      mensajeExito.textContent = "Por favor, corrija los campos marcados.";
      mensajeExito.style.color = "var(--color-peligro)";
      return;
    }

    const usuario = {
      run: vRut.toUpperCase(),
      nombre: vNombre,
      apellidos: vApellidos,
      correo: vCorreo,
      direccion: vDireccion,
      region: selectRegion.value,
      comuna: selectComuna.value,
      fechaNacimiento: vFecha,
      rol: "Cliente"
    };

    localStorage.setItem("ultimoUsuarioSanMarcos", JSON.stringify(usuario));
    mensajeExito.textContent = "Usuario tutor registrado exitosamente.";
    mensajeExito.style.color = "var(--color-primario)";
    formRegistro.reset();
  });
}