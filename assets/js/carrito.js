const contenedorCarrito = document.querySelector("#lista-items-carrito");
const textoTotal = document.querySelector("#total-carrito");

function renderizarVistaCarrito() {
  if (!contenedorCarrito) return;
  contenedorCarrito.replaceChildren();

  const carrito = obtenerCarrito();
  let total = 0;

  if (carrito.length === 0) {
    const vacio = document.createElement("p");
    vacio.textContent = "Tu carrito de compras está actualmente vacío.";
    contenedorCarrito.appendChild(vacio);
    if (textoTotal) textoTotal.textContent = "$0";
    return;
  }

  for (let i = 0; i < carrito.length; i++) {
    const item = carrito[i];
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const fila = document.createElement("article");
    fila.classList.add("item-carrito");

    const img = document.createElement("img");
    img.src = item.imagen;
    img.alt = item.nombre;
    img.style.width = "80px";
    img.style.height = "80px";
    img.style.objectFit = "cover";

    const info = document.createElement("div");
    info.style.flex = "1";
    const h3 = document.createElement("h3");
    h3.textContent = item.nombre;
    const pDesc = document.createElement("p");
    pDesc.textContent = item.presentacion;
    pDesc.style.color = "var(--color-texto-suave)";
    info.appendChild(h3);
    info.appendChild(pDesc);

    const precioUnit = document.createElement("p");
    precioUnit.style.fontWeight = "bold";
    precioUnit.textContent = item.precio === 0 ? "FREE" : `$${item.precio.toLocaleString("es-CL")}`;

    const controles = document.createElement("div");
    controles.classList.add("controles-cantidad");

    const btnMenos = document.createElement("button");
    btnMenos.type = "button";
    btnMenos.textContent = "-";
    btnMenos.addEventListener("click", function () {
      if (item.cantidad > 1) {
        item.cantidad--;
      } else {
        carrito.splice(i, 1);
      }
      guardarCarrito(carrito);
      renderizarVistaCarrito();
    });

    const cantSpan = document.createElement("span");
    cantSpan.textContent = item.cantidad;
    cantSpan.style.padding = "0 0.5rem";

    const btnMas = document.createElement("button");
    btnMas.type = "button";
    btnMas.textContent = "+";
    btnMas.addEventListener("click", function () {
      item.cantidad++;
      guardarCarrito(carrito);
      renderizarVistaCarrito();
    });

    controles.appendChild(btnMenos);
    controles.appendChild(cantSpan);
    controles.appendChild(btnMas);

    fila.appendChild(img);
    fila.appendChild(info);
    fila.appendChild(precioUnit);
    fila.appendChild(controles);

    contenedorCarrito.appendChild(fila);
  }

  if (textoTotal) {
    textoTotal.textContent = `$${total.toLocaleString("es-CL")}`;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  renderizarVistaCarrito();
});