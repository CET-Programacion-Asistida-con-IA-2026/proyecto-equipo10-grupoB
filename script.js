// =============================================
// CeliaCheck — JavaScript
// =============================================

// ---- Perfil alimentario ----
function togglePerfil(btn) {
  btn.classList.toggle('active')
}

// ---- sección educativa ----
function mostrarSeccion(id) {
    const secciones = document.querySelectorAll(".perfil-info");
    secciones.forEach(seccion => {
        seccion.style.display = "none";
    });
    document.getElementById(id).style.display = "block";
    document.getElementById("educativa").scrollIntoView({ behavior:"smooth" });
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

const alimentos = {
  arroz: {
    vegano: "apto",
    vegetariano: "apto",
    diabetico: "revisar",
    celiaco: "apto",
    motivo: "No contiene gluten."
  },
  pan: {
    vegano: "apto",
    vegetariano: "apto",
    diabetico: "revisar",
    celiaco: "no_apto",
    motivo: "Contiene harina de trigo (gluten)."
  },
  leche: {
    vegano: "no_apto",
    vegetariano: "apto",
    diabetico: "revisar",
    celiaco: "apto",
    motivo: "Es un producto de origen animal."
  },
  pollo: {
    vegano: "no_apto",
    vegetariano: "no_apto",
    diabetico: "apto",
    celiaco: "apto",
    motivo: "Es carne."
  },
  quinoa: {
    vegano: "apto",
    vegetariano: "apto",
    diabetico: "apto",
    celiaco: "apto",
    motivo: "Es naturalmente libre de gluten."
  }
}

function verificar() {
  let alimento = document.getElementById("alimento-input").value.toLowerCase().trim();
  let estado = document.getElementById("resultado-estado");
  let texto = document.getElementById("resultado-texto");
  let resultado_div = document.getElementById("resultado");

  let dato = alimentos[alimento];

  resultado_div.style.display = "block";
  resultado_div.className = "cc-resultado";

  if (!dato) {
    estado.textContent = "⚪ NO ENCONTRADO";
    texto.textContent = "Ese alimento no está registrado en la base de datos.";
    resultado_div.classList.add("amarillo");
    return;
  }

  let resultado = dato[perfilActual];

  if (resultado === "apto") {
    estado.textContent = "🟢 APTO";
    resultado_div.classList.add("verde");
  } else if (resultado === "revisar") {
    estado.textContent = "🟡 REVISAR";
    resultado_div.classList.add("amarillo");
  } else if (resultado === "no_apto") {
    estado.textContent = "🔴 NO APTO";
    resultado_div.classList.add("rojo");
  }

  texto.textContent = dato.motivo;
}

// ---- Formulario ----
function enviarFormulario() {
  let toast = document.getElementById('toast')
  toast.classList.add('show')
  setTimeout(() => toast.classList.remove('show'), 3000)
}

/* ============================================================
   MAPA INCLUSIVO
   ============================================================ */

'use strict';

const PLACES = [
  { id: 1, name: 'La Fabrica Sin Gluten', type: 'Panadería · Cafetería', category: 'celiaco', address: 'Av. Corrientes 1234, CABA', lat: -34.6037, lng: -58.3816, tags: ['Sin TACC', 'Desayuno', 'Take away'], info: 'Panadería 100% libre de gluten. Todos los productos están certificados ACELA. Menú especial celíaco con medialunas, facturas y tortas.' },
  { id: 2, name: 'Raíces Café', type: 'Cafetería', category: 'celiaco', address: 'Thames 623, Palermo, CABA', lat: -34.5895, lng: -58.4244, tags: ['Sin TACC', 'Café de especialidad', 'Brunch'], info: 'Cafetería boutique con carta celíaca completa. Opciones de desayuno y almuerzo libres de gluten.' },
  { id: 3, name: 'Green Bowl', type: 'Restaurante', category: 'celiaco', address: 'Uriarte 1499, Palermo, CABA', lat: -34.5872, lng: -58.4313, tags: ['Sin TACC', 'Bowls', 'Almuerzo'], info: 'Bowls y ensaladas gourmet, todos aptos celíacos. Ingredientes frescos y de estación.' },
  { id: 4, name: 'Dulce Equilibrio', type: 'Pastelería · Cafetería', category: 'diabetico', address: 'Av. Santa Fe 3200, Palermo, CABA', lat: -34.5878, lng: -58.4132, tags: ['Bajo índice glucémico', 'Sin azúcar', 'Pastelería'], info: 'Pastelería especializada en postres aptos para diabéticos. Utilizan edulcorantes naturales como stevia y eritritol.' },
  { id: 5, name: 'Nutribar', type: 'Restaurante saludable', category: 'diabetico', address: 'Maipú 900, Microcentro, CABA', lat: -34.5993, lng: -58.3755, tags: ['Bajo en carbohidratos', 'Almuerzo', 'Menú ejecutivo'], info: 'Menú diario con opciones para diabéticos tipo 1 y 2. Cuentan con nutricionista en consulta.' },
  { id: 6, name: 'Vital Kitchen', type: 'Restaurante', category: 'diabetico', address: 'Av. del Libertador 1555, Retiro, CABA', lat: -34.5787, lng: -58.3781, tags: ['Sin azúcar', 'Proteico', 'Ensaladas'], info: 'Cocina saludable con control nutricional. Cada plato tiene info calórica y glucémica.' },
  { id: 7, name: 'El Vergel', type: 'Restaurante vegano', category: 'vegano', address: 'Honduras 5587, Palermo, CABA', lat: -34.5826, lng: -58.4319, tags: ['100% vegano', 'Orgánico', 'Cena'], info: 'Restaurante íntegramente vegano desde 2015. Carta de temporada con productos orgánicos.' },
  { id: 8, name: 'Verde Siempre', type: 'Cafetería vegana', category: 'vegano', address: 'Charcas 4702, Palermo, CABA', lat: -34.5868, lng: -58.4196, tags: ['100% vegano', 'Café de especialidad', 'Brunch'], info: 'Cafetería vegana con leches vegetales propias y pastelería artesanal.' },
  { id: 9, name: 'Roots Plant Bar', type: 'Bar · Restaurante', category: 'vegano', address: 'Gurruchaga 1500, Villa Crespo, CABA', lat: -34.5942, lng: -58.4387, tags: ['100% vegano', 'Cócteles', 'Nocturno'], info: 'Bar vegano con coctelería sin alcohol y con alcohol. Tapas y tablas 100% vegetales.' },
  { id: 10, name: 'La Huerta', type: 'Restaurante vegetariano', category: 'vegetariano', address: 'Av. Rivadavia 4500, Caballito, CABA', lat: -34.6173, lng: -58.4327, tags: ['Vegetariano', 'Casero', 'Almuerzo y cena'], info: 'Cocina casera vegetariana con menú ejecutivo diario.' },
  { id: 11, name: 'Sprout Café', type: 'Cafetería', category: 'vegetariano', address: 'Av. Cabildo 2100, Belgrano, CABA', lat: -34.5631, lng: -58.4561, tags: ['Vegetariano', 'Desayuno', 'Bowls'], info: 'Cafetería vegetariana con foco en desayunos saludables.' },
  { id: 12, name: 'Semilla', type: 'Restaurante', category: 'vegetariano', address: 'José Antonio Cabrera 3261, Palermo, CABA', lat: -34.5913, lng: -58.4158, tags: ['Vegetariano', 'Gourmet', 'Vinos naturales'], info: 'Restaurante vegetariano gourmet con carta de vinos naturales.' },
  { id: 13, name: 'Mosaico Gastronómico', type: 'Restaurante familiar', category: 'multiapto', address: 'Av. Córdoba 5500, Palermo, CABA', lat: -34.5861, lng: -58.4421, tags: ['Sin TACC', 'Vegano', 'Vegetariano', 'Bajo en azúcar', 'Familiar'], info: '⭐ El restaurante más inclusivo de la zona. Carta dividida por perfil: celíaco, diabético, vegano y vegetariano.' },
  { id: 14, name: 'Casa Común', type: 'Cafetería · Restaurante', category: 'multiapto', address: 'Humboldt 1764, Palermo, CABA', lat: -34.5893, lng: -58.4367, tags: ['Sin TACC', 'Vegano', 'Vegetariano', 'Sin azúcar', 'Niños'], info: '⭐ Espacio diseñado para toda la familia. Menú infantil, opciones celíacas, veganas y para diabéticos.' },
  { id: 15, name: 'El Encuentro', type: 'Restaurante · Bar', category: 'multiapto', address: 'Costa Rica 5644, Palermo, CABA', lat: -34.5816, lng: -58.4282, tags: ['Sin TACC', 'Vegano', 'Bajo en carbohidratos', 'Pet friendly'], info: '⭐ Carta inclusiva con opciones para todos. Pet friendly con espacio exterior.' },
];

const CATEGORY_CONFIG = {
  celiaco:     { color: '#3B82F6', label: 'Celíacos',     emoji: '🟦' },
  diabetico:   { color: '#22C55E', label: 'Diabéticos',   emoji: '🟩' },
  vegano:      { color: '#EAB308', label: 'Veganos',      emoji: '🟨' },
  vegetariano: { color: '#F97316', label: 'Vegetarianos', emoji: '🟧' },
  multiapto:   { color: '#A855F7', label: 'Multiaptos ⭐', emoji: '⭐' },
};

let map = null;
let markers = {};
let activeCategory = 'all';
let activePlaceId = null;

function createMarkerIcon(category, isActive = false) {
  const cfg = CATEGORY_CONFIG[category];
  const color = cfg.color;
  const size = isActive ? 40 : 32;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32"><circle cx="16" cy="16" r="11" fill="${color}" stroke="#fff" stroke-width="2.5" filter="drop-shadow(0 2px 4px rgba(0,0,0,.25))"/><circle cx="16" cy="16" r="5" fill="#fff" opacity=".85"/></svg>`;
  return L.divIcon({ html: svg, className: 'custom-marker', iconSize: [size, size], iconAnchor: [size/2, size/2], popupAnchor: [0, -(size/2+4)] });
}

function getFilteredPlaces() {
  if (activeCategory === 'all') return PLACES;
  return PLACES.filter(p => p.category === activeCategory);
}

function clearMarkers() {
  Object.values(markers).forEach(m => m.remove());
  markers = {};
}

function addMarkers(places) {
  places.forEach(place => {
    const cfg = CATEGORY_CONFIG[place.category];
    const popupContent = `<div style="font-family:sans-serif;min-width:180px"><p style="color:${cfg.color};font-weight:bold;margin:0 0 4px">${cfg.emoji} ${cfg.label}</p><p style="font-weight:bold;margin:0 0 2px">${place.name}</p><p style="font-size:12px;color:#666;margin:0 0 8px">${place.address}</p></div>`;
    const marker = L.marker([place.lat, place.lng], { icon: createMarkerIcon(place.category, false) }).addTo(map).bindPopup(popupContent, { maxWidth: 240 });
    markers[place.id] = marker;
  });
}

function applyFilter(category) {
  activeCategory = category;
  const filtered = getFilteredPlaces();
  clearMarkers();
  addMarkers(filtered);
  if (filtered.length > 0) {
    const bounds = filtered.map(p => [p.lat, p.lng]);
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15, animate: true });
  }
}

function initMap() {
  const mapEl = document.getElementById('map');
  if (!mapEl || typeof L === 'undefined') return;

  map = L.map('map', { center: [-34.595, -58.420], zoom: 13 });
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(map);

  applyFilter('all');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMap);
} else {
  initMap();
}
