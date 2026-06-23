// =============================================
// CeliaCheck — JavaScript
// =============================================

// ---- Perfil alimentario ----
function togglePerfil(btn) {
  btn.classList.toggle('active')
}

// ---- sección educativa ----
function mostrarSeccion(id) {


    const secciones =
      document.querySelectorAll(".perfil-info");

    secciones.forEach(seccion => {
        seccion.style.display = "none";
    });

    document.getElementById(id).style.display = "block";

    document
      .getElementById("educativa")
      .scrollIntoView({
        behavior:"smooth"
      });

}



// ---- Semáforo ----
let perfilActual = "vegano";

function selPerfil(btn, perfil) {
  perfilActual = perfil;

  document.querySelectorAll(".cc-perfil-btn").forEach(b => {
    b.classList.remove("activo");
  });

  btn.classList.add("activo");
}

function verificar() {
  let alimento = document
    .getElementById("alimento-input")
    .value
    .toLowerCase();

  let estado = document.getElementById("resultado-estado");
  let texto = document.getElementById("resultado-texto");

  if (perfilActual === "celiaco" && alimento === "pan") {
    estado.textContent = "🔴 NO APTO";
    texto.textContent = "Contiene gluten.";
  }
  else {
    estado.textContent = "🟢 APTO";
    texto.textContent = "Podés consumirlo.";
  }
}



// ---- Filtros del mapa ----
function toggleFiltro(btn) {
  btn.classList.toggle('on')
}

// ---- Formulario ----
function enviarFormulario() {
  let toast = document.getElementById('toast')
  toast.classList.add('show')
  setTimeout(() => toast.classList.remove('show'), 3000)
}





