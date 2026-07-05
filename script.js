// =============================================
// CeliaCheck — JavaScript
// =============================================

// ---- Perfil alimentario ----
let perfilActual = null;

function elegirPerfil(btn, perfil) {
  perfilActual = perfil;
  document.querySelectorAll(".cc-profile-btn").forEach(b => {
    b.classList.remove("active");
  });
  btn.classList.add("active");
}

// ---- Formulario ----
function enviarFormulario() {
  let toast = document.getElementById('toast')
  toast.classList.add('show')
  setTimeout(() => toast.classList.remove('show'), 3000)
}

// ---- Búsqueda de producto (Open Food Facts) ----
async function buscarProductoPorCodigo(codigo) {
  try {
    const response = await fetch(`https://world.openfoodfacts.org/api/v2/product/${codigo}.json`);
    const data = await response.json();

    if (data.status === 0) {
      return null;
    }

    return {
      nombre: data.product.product_name || "Producto sin nombre",
      ingredientes: data.product.ingredients_text || "Sin información de ingredientes"
    };
  } catch (err) {
    console.error("Error buscando producto:", err);
    return null;
  }
}

async function buscarPorInput() {
  const codigo = document.getElementById("codigo-barras").value.trim();
  if (!codigo) return;

  mostrarSemaforo();

  const producto = await buscarProductoPorCodigo(codigo);

  if (!producto) {
    ocultarSemaforo();
    alert("No se encontró ningún producto con ese código.");
    return;
  }

  await evaluarProducto(producto);
}

// ---- Semáforo ----
let resultadoPendiente = null;

function mostrarSemaforo() {
  document.getElementById("semaforo-overlay").classList.add("mostrar");
  document.getElementById("luz-roja").classList.remove("encendida");
  document.getElementById("luz-amarilla").classList.add("encendida");
  document.getElementById("luz-verde").classList.remove("encendida");
  document.getElementById("semaforo-texto").textContent = "Analizando producto...";
  resultadoPendiente = null;
}

function ocultarSemaforo() {
  document.getElementById("semaforo-overlay").classList.remove("mostrar");
}

async function evaluarProducto(producto) {
  if (!perfilActual) {
    ocultarSemaforo();
    alert("Antes de buscar, seleccioná tu perfil alimentario (Celiaco, Vegetariano o Vegano) arriba en '¿Cuál es tu alimentación?'.");
    return;
  }

  if (!producto.ingredientes || producto.ingredientes === "Sin información de ingredientes") {
    ocultarSemaforo();
    alert(`${producto.nombre}\nNo hay información de ingredientes disponible para evaluar este producto.`);
    return;
  }

  const evaluacion = evaluarIngredientes(producto.ingredientes, perfilActual);

  document.getElementById("luz-amarilla").classList.remove("encendida");
  if (evaluacion.resultado === "APTO") {
    document.getElementById("luz-verde").classList.add("encendida");
  } else {
    document.getElementById("luz-roja").classList.add("encendida");
  }
  document.getElementById("semaforo-texto").textContent =
    `${producto.nombre}: ${evaluacion.resultado}. ${evaluacion.motivo} — Tocá la pantalla para continuar.`;

  resultadoPendiente = evaluacion.resultado;
}

function cerrarSemaforoYMostrarResultado() {
  if (!resultadoPendiente) return;

  ocultarSemaforo();

  document.body.classList.remove("cc-flash-verde", "cc-flash-rojo");
  if (resultadoPendiente === "APTO") {
    document.body.classList.add("cc-flash-verde");
  } else {
    document.body.classList.add("cc-flash-rojo");
  }

  setTimeout(() => {
    document.body.classList.remove("cc-flash-verde", "cc-flash-rojo");
  }, 3000);

  resultadoPendiente = null;
}

// ---- Listas de ingredientes por perfil ----

const INGREDIENTES_NO_VEGANO = [
  "carne", "res", "vacuno", "cerdo",]