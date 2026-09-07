// Catálogo oficial Forma A - Veterinaria San Marcos
const catalogoSanMarcos = [
  {
    codigo: "ME004",
    categoria: "Antiparasitarios",
    nombre: "Nexgard (Afoxolaner)",
    presentacion: "Masticable 1 unid. (Perro)",
    precio: 9500,
    stock: 60,
    stockCritico: 10,
    descripcion: "Tratamiento y prevención de infestaciones por pulgas y garrapatas en perros.",
    imagen: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=500&auto=format&fit=crop&q=60"
  },
  {
    codigo: "ME005",
    categoria: "Antiparasitarios",
    nombre: "Bravecto (Fluralaner)",
    presentacion: "Masticable 1 unid. (Perro)",
    precio: 18900,
    stock: 8, // Stock crítico
    stockCritico: 10,
    descripcion: "Protección continua por hasta 12 semanas contra pulgas y garrapatas.",
    imagen: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=500&auto=format&fit=crop&q=60"
  },
  {
    codigo: "ME001",
    categoria: "Antibióticos",
    nombre: "Amoxibay 250mg (Amoxicilina)",
    presentacion: "Blíster 10 comp. (Perro / Gato)",
    precio: 4200,
    stock: 45,
    stockCritico: 10,
    descripcion: "Antibiótico bactericida de amplio espectro para infecciones respiratorias y dérmicas.",
    imagen: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60"
  },
  {
    codigo: "ME011",
    categoria: "Dermatología",
    nombre: "Clorhexidina shampoo 2%",
    presentacion: "Frasco 250ml (Perro / Gato)",
    precio: 8900,
    stock: 0, // Agotado
    stockCritico: 5,
    descripcion: "Antiséptico de uso tópico para higiene y tratamiento de piodermas y dermatitis.",
    imagen: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=500&auto=format&fit=crop&q=60"
  },
  {
    codigo: "ME013",
    categoria: "Dermatología",
    nombre: "Apoquel 16mg (Oclacitinib)",
    presentacion: "Blíster 10 comp. (Perro)",
    precio: 22000,
    stock: 18,
    stockCritico: 5,
    descripcion: "Control rápido y seguro del prurito asociado a dermatitis alérgica en caninos.",
    imagen: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=500&auto=format&fit=crop&q=60"
  },
  {
    codigo: "EDU001",
    categoria: "Educación",
    nombre: "Guía de Primeros Auxilios y Vacunación",
    presentacion: "Documento digital PDF",
    precio: 0, // Ítem FREE requerido por Anexo 1
    stock: 200,
    stockCritico: 10,
    descripcion: "Manual preventivo con protocolos de urgencia para tutores responsables.",
    imagen: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&auto=format&fit=crop&q=60"
  }
];

function obtenerCarrito() {
  const data = localStorage.getItem("carritoSanMarcos");
  return data !== null ? JSON.parse(data) : [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("carritoSanMarcos", JSON.stringify(carrito));
  actualizarBadgeCarrito();
}

function actualizarBadgeCarrito() {
  const badges = document.querySelectorAll(".contador-carrito");
  const carrito = obtenerCarrito();
  let total = 0;
  for (const item of carrito) {
    total += item.cantidad;
  }
  for (const b of badges) {
    b.textContent = `Cart (${total})`;
  }
}

function agregarAlCarrito(codigo, cantidad) {
  const cant = cantidad || 1;
  let prod = null;
  for (const p of catalogoSanMarcos) {
    if (p.codigo === codigo) {
      prod = p;
      break;
    }
  }

  if (!prod || prod.stock === 0) {
    alert("Producto no disponible o sin stock.");
    return;
  }

  const carrito = obtenerCarrito();
  let existente = null;
  for (const item of carrito) {
    if (item.codigo === codigo) {
      existente = item;
      break;
    }
  }

  if (existente) {
    if (existente.cantidad + cant <= prod.stock) {
      existente.cantidad += cant;
    } else {
      alert(`No puedes superar el stock disponible (${prod.stock} unidades).`);
      return;
    }
  } else {
    carrito.push({
      codigo: prod.codigo,
      nombre: prod.nombre,
      precio: prod.precio,
      cantidad: cant,
      presentacion: prod.presentacion,
      descripcion: prod.descripcion,
      imagen: prod.imagen
    });
  }

  guardarCarrito(carrito);
  alert(`"${prod.nombre}" añadido al carrito.`);
}

function renderizarCatalogo(lista, idContenedor) {
  const contenedor = document.querySelector(idContenedor);
  if (!contenedor) return;
  contenedor.replaceChildren();

  for (const prod of lista) {
    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta");

    const img = document.createElement("img");
    img.src = prod.imagen;
    img.alt = prod.nombre;

    const cat = document.createElement("p");
    cat.classList.add("etiqueta");
    cat.textContent = prod.categoria;

    const link = document.createElement("a");
    link.href = `producto-detalle.html?codigo=${prod.codigo}`;
    const h3 = document.createElement("h3");
    h3.textContent = prod.nombre;
    link.appendChild(h3);

    const pres = document.createElement("p");
    pres.textContent = prod.presentacion;

    const precio = document.createElement("p");
    precio.classList.add("precio-producto");
    precio.textContent = prod.precio === 0 ? "FREE (Gratis)" : `$${prod.precio.toLocaleString("es-CL")}`;

    const stock = document.createElement("p");
    stock.textContent = `Stock: ${prod.stock} unidades`;

    if (prod.stock > 0 && prod.stock <= prod.stockCritico) {
      stock.textContent = `¡Alerta! Últimas ${prod.stock} unidades (Stock Crítico)`;
      stock.classList.add("aviso-stock-critico");
    }
    if (prod.stock === 0) {
      stock.textContent = "Agotado temporalmente";
      stock.classList.add("producto-agotado");
    }

    const btn = document.createElement("button");
    btn.type = "button";
    btn.classList.add("boton");
    btn.textContent = prod.stock === 0 ? "Sin Stock" : "Añadir al Carrito";
    btn.disabled = prod.stock === 0;

    btn.addEventListener("click", function () {
      agregarAlCarrito(prod.codigo, 1);
    });

    tarjeta.appendChild(img);
    tarjeta.appendChild(cat);
    tarjeta.appendChild(link);
    tarjeta.appendChild(pres);
    tarjeta.appendChild(precio);
    tarjeta.appendChild(stock);
    tarjeta.appendChild(btn);

    contenedor.appendChild(tarjeta);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  actualizarBadgeCarrito();
  renderizarCatalogo(catalogoSanMarcos, "#catalogo-productos");
  renderizarCatalogo(catalogoSanMarcos.slice(0, 4), "#destacados-home");
});