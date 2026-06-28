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

// Crear mapa centrado en Buenos Aires

const map = L.map('map').setView([-34.6037, -58.3816], 12);

// Cargar OpenStreetMap

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
maxZoom: 19,
attribution: '© OpenStreetMap'
}).addTo(map);

// Panel de información

const info = document.getElementById('info');

// Datos de ejemplo

const locales = [

```
{
    nombre: "Panadería Sin TACC",
    categoria: "Celíacos 🟦",
    direccion: "Palermo",
    lat: -34.588,
    lng: -58.430
},

{
    nombre: "Dulce Salud",
    categoria: "Diabéticos 🟩",
    direccion: "Belgrano",
    lat: -34.563,
    lng: -58.455
},

{
    nombre: "Green Life",
    categoria: "Veganos 🟨",
    direccion: "Recoleta",
    lat: -34.590,
    lng: -58.392
},

{
    nombre: "Huerta Natural",
    categoria: "Vegetarianos 🟧",
    direccion: "Caballito",
    lat: -34.620,
    lng: -58.440
},

{
    nombre: "Familia Feliz",
    categoria: "Multiaptos ⭐",
    direccion: "Puerto Madero",
    lat: -34.608,
    lng: -58.364
}
```

];

// Crear marcadores

locales.forEach(local => {

```
const marker = L.marker([local.lat, local.lng]).addTo(map);

marker.bindPopup(local.nombre);

marker.on('click', () => {

    info.innerHTML = `
        <h2>${local.nombre}</h2>
        <p><strong>Categoría:</strong> ${local.categoria}</p>
        <p><strong>Dirección:</strong> ${local.direccion}</p>
    `;

});


});


// ---- Formulario ----
function enviarFormulario() {
  let toast = document.getElementById('toast')
  toast.classList.add('show')
  setTimeout(() => toast.classList.remove('show'), 3000)
}





