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

  let alimento = document
    .getElementById("alimento-input")
    .value
    .toLowerCase()
    .trim();

  let estado = document.getElementById("resultado-estado");
  let texto = document.getElementById("resultado-texto");

  let dato = alimentos[alimento];

  // Si el alimento no existe
  if (!dato) {
    estado.textContent = "⚪ NO ENCONTRADO";
    texto.textContent = "Ese alimento no está registrado en la base de datos.";
    return;
  }

  let resultado = dato[perfilActual];

  if (resultado === "apto") {
    estado.textContent = "🟢 APTO";
  } else if (resultado === "revisar") {
    estado.textContent = "🟡 REVISAR";
  } else if (resultado === "no_apto") {
    estado.textContent = "🔴 NO APTO";
  }

  texto.textContent = dato.motivo;

}



// ---- Filtros del mapa ----

// Crear mapa centrado en Buenos Aires

/* ============================================================
   MAPA INCLUSIVO — app.js
   Lógica: datos, mapa Leaflet, filtros, panel y modal
   ============================================================ */

'use strict';

/* ─────────────────────────────────────────────
   1. DATOS: lugares del mapa
   ───────────────────────────────────────────── */
const PLACES = [
  // ── Celíacos ──
  {
    id: 1,
    name: 'La Fabrica Sin Gluten',
    type: 'Panadería · Cafetería',
    category: 'celiaco',
    address: 'Av. Corrientes 1234, CABA',
    lat: -34.6037, lng: -58.3816,
    tags: ['Sin TACC', 'Desayuno', 'Take away'],
    info: 'Panadería 100% libre de gluten. Todos los productos están certificados ACELA. Menú especial celíaco con medialunas, facturas y tortas.',
  },
  {
    id: 2,
    name: 'Raíces Café',
    type: 'Cafetería',
    category: 'celiaco',
    address: 'Thames 623, Palermo, CABA',
    lat: -34.5895, lng: -58.4244,
    tags: ['Sin TACC', 'Café de especialidad', 'Brunch'],
    info: 'Cafetería boutique con carta celíaca completa. Opciones de desayuno y almuerzo libres de gluten. Ambiente tranquilo y luminoso.',
  },
  {
    id: 3,
    name: 'Green Bowl',
    type: 'Restaurante',
    category: 'celiaco',
    address: 'Uriarte 1499, Palermo, CABA',
    lat: -34.5872, lng: -58.4313,
    tags: ['Sin TACC', 'Bowls', 'Almuerzo'],
    info: 'Bowls y ensaladas gourmet, todos aptos celíacos. Ingredientes frescos y de estación. Ideal para almuerzo rápido y saludable.',
  },

  // ── Diabéticos ──
  {
    id: 4,
    name: 'Dulce Equilibrio',
    type: 'Pastelería · Cafetería',
    category: 'diabetico',
    address: 'Av. Santa Fe 3200, Palermo, CABA',
    lat: -34.5878, lng: -58.4132,
    tags: ['Bajo índice glucémico', 'Sin azúcar', 'Pastelería'],
    info: 'Pastelería especializada en postres aptos para diabéticos. Utilizan edulcorantes naturales como stevia y eritritol. Tortas de cumpleaños por encargo.',
  },
  {
    id: 5,
    name: 'Nutribar',
    type: 'Restaurante saludable',
    category: 'diabetico',
    address: 'Maipú 900, Microcentro, CABA',
    lat: -34.5993, lng: -58.3755,
    tags: ['Bajo en carbohidratos', 'Almuerzo', 'Menú ejecutivo'],
    info: 'Menú diario con opciones para diabéticos tipo 1 y 2. Cuentan con nutricionista en consulta. Carta con información de índice glucémico.',
  },
  {
    id: 6,
    name: 'Vital Kitchen',
    type: 'Restaurante',
    category: 'diabetico',
    address: 'Av. del Libertador 1555, Retiro, CABA',
    lat: -34.5787, lng: -58.3781,
    tags: ['Sin azúcar', 'Proteico', 'Ensaladas'],
    info: 'Cocina saludable con control nutricional. Cada plato tiene info calórica y glucémica. Opciones sin azúcar añadida en todos los postres.',
  },

  // ── Veganos ──
  {
    id: 7,
    name: 'El Vergel',
    type: 'Restaurante vegano',
    category: 'vegano',
    address: 'Honduras 5587, Palermo, CABA',
    lat: -34.5826, lng: -58.4319,
    tags: ['100% vegano', 'Orgánico', 'Cena'],
    info: 'Restaurante íntegramente vegano desde 2015. Carta de temporada con productos orgánicos de pequeños productores. Tiene opciones sin gluten también.',
  },
  {
    id: 8,
    name: 'Verde Siempre',
    type: 'Cafetería vegana',
    category: 'vegano',
    address: 'Charcas 4702, Palermo, CABA',
    lat: -34.5868, lng: -58.4196,
    tags: ['100% vegano', 'Café de especialidad', 'Brunch'],
    info: 'Cafetería vegana con leches vegetales propias y pastelería artesanal. Ambiente cozy y pet friendly. Desayunos y brunch los fines de semana.',
  },
  {
    id: 9,
    name: 'Roots Plant Bar',
    type: 'Bar · Restaurante',
    category: 'vegano',
    address: 'Gurruchaga 1500, Villa Crespo, CABA',
    lat: -34.5942, lng: -58.4387,
    tags: ['100% vegano', 'Cócteles', 'Nocturno'],
    info: 'Bar vegano con coctelería sin alcohol y con alcohol. Tapas y tablas 100% vegetales. Música en vivo los jueves. Terraza disponible en verano.',
  },

  // ── Vegetarianos ──
  {
    id: 10,
    name: 'La Huerta',
    type: 'Restaurante vegetariano',
    category: 'vegetariano',
    address: 'Av. Rivadavia 4500, Caballito, CABA',
    lat: -34.6173, lng: -58.4327,
    tags: ['Vegetariano', 'Casero', 'Almuerzo y cena'],
    info: 'Cocina casera vegetariana con menú ejecutivo diario. Los domingos tienen brunch especial. Opción de menú sin gluten con aviso previo.',
  },
  {
    id: 11,
    name: 'Sprout Café',
    type: 'Cafetería',
    category: 'vegetariano',
    address: 'Av. Cabildo 2100, Belgrano, CABA',
    lat: -34.5631, lng: -58.4561,
    tags: ['Vegetariano', 'Desayuno', 'Bowls'],
    info: 'Cafetería vegetariana con foco en desayunos saludables. Granola artesanal, bowls de frutas y acaí, sándwiches de vegetales asados.',
  },
  {
    id: 12,
    name: 'Semilla',
    type: 'Restaurante',
    category: 'vegetariano',
    address: 'José Antonio Cabrera 3261, Palermo, CABA',
    lat: -34.5913, lng: -58.4158,
    tags: ['Vegetariano', 'Gourmet', 'Vinos naturales'],
    info: 'Restaurante vegetariano gourmet con carta de vinos naturales. Platos creativos y presentación de autor. Reserva recomendada.',
  },

  // ── Multiaptos ──
  {
    id: 13,
    name: 'Mosaico Gastronómico',
    type: 'Restaurante familiar',
    category: 'multiapto',
    address: 'Av. Córdoba 5500, Palermo, CABA',
    lat: -34.5861, lng: -58.4421,
    tags: ['Sin TACC', 'Vegano', 'Vegetariano', 'Bajo en azúcar', 'Familiar'],
    info: '⭐ El restaurante más inclusivo de la zona. Carta dividida por perfil: celíaco, diabético, vegano y vegetariano. Todos los platos están etiquetados. Personal capacitado en alergias y restricciones.',
  },
  {
    id: 14,
    name: 'Casa Común',
    type: 'Cafetería · Restaurante',
    category: 'multiapto',
    address: 'Humboldt 1764, Palermo, CABA',
    lat: -34.5893, lng: -58.4367,
    tags: ['Sin TACC', 'Vegano', 'Vegetariano', 'Sin azúcar', 'Niños'],
    info: '⭐ Espacio diseñado para toda la familia. Menú infantil, opciones celíacas, veganas y para diabéticos. Sillitas para bebés y zona de juegos.',
  },
  {
    id: 15,
    name: 'El Encuentro',
    type: 'Restaurante · Bar',
    category: 'multiapto',
    address: 'Costa Rica 5644, Palermo, CABA',
    lat: -34.5816, lng: -58.4282,
    tags: ['Sin TACC', 'Vegano', 'Bajo en carbohidratos', 'Pet friendly'],
    info: '⭐ Carta inclusiva con opciones para todos. Pet friendly con espacio exterior. Carta de cervezas artesanales con opciones sin alcohol. Brunch los sábados y domingos.',
  },
];

/* ─────────────────────────────────────────────
   2. CONFIG DE CATEGORÍAS
   ───────────────────────────────────────────── */
const CATEGORY_CONFIG = {
  celiaco:     { color: '#3B82F6', label: 'Celíacos',     emoji: '🟦' },
  diabetico:   { color: '#22C55E', label: 'Diabéticos',   emoji: '🟩' },
  vegano:      { color: '#EAB308', label: 'Veganos',      emoji: '🟨' },
  vegetariano: { color: '#F97316', label: 'Vegetarianos', emoji: '🟧' },
  multiapto:   { color: '#A855F7', label: 'Multiaptos ⭐', emoji: '⭐' },
};

/* ─────────────────────────────────────────────
   3. ESTADO GLOBAL
   ───────────────────────────────────────────── */
let map = null;
let markers = {};          // { placeId: leafletMarker }
let activeCategory = 'all';
let activePlaceId = null;

/* ─────────────────────────────────────────────
   4. HELPERS
   ───────────────────────────────────────────── */

/** Crea un ícono SVG personalizado para Leaflet */
function createMarkerIcon(category, isActive = false) {
  const cfg = CATEGORY_CONFIG[category];
  const color = cfg.color;
  const size = isActive ? 40 : 32;
  const pulse = isActive
    ? `<circle cx="16" cy="16" r="15" fill="${color}" opacity=".2"><animate attributeName="r" values="10;15;10" dur="1.5s" repeatCount="indefinite"/></circle>`
    : '';

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
      ${pulse}
      <circle cx="16" cy="16" r="11" fill="${color}" stroke="#fff" stroke-width="2.5"
        filter="drop-shadow(0 2px 4px rgba(0,0,0,.25))"/>
      <circle cx="16" cy="16" r="5" fill="#fff" opacity=".85"/>
    </svg>`;

  return L.divIcon({
    html: svg,
    className: 'custom-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -(size / 2 + 4)],
  });
}

/** Filtra los lugares según la categoría activa */
function getFilteredPlaces() {
  if (activeCategory === 'all') return PLACES;
  return PLACES.filter(p => p.category === activeCategory);
}

/** Actualiza el contador del header */
function updateStatCount(n) {
  document.getElementById('stat-total').querySelector('.stat-num').textContent = n;
}

/** Actualiza el texto del panel */
function updatePanelCount(n) {
  document.getElementById('panel-count').textContent = `${n} resultado${n !== 1 ? 's' : ''}`;
}

/* ─────────────────────────────────────────────
   5. PANEL LATERAL: lista de lugares
   ───────────────────────────────────────────── */
function renderPlacesList(places) {
  const list = document.getElementById('places-list');
  list.innerHTML = '';

  if (places.length === 0) {
    list.innerHTML = `
      <li class="empty-state">
        <span class="empty-state-icon">🔍</span>
        <p>No hay lugares para este filtro todavía.</p>
        <p style="font-size:12px;margin-top:4px;">Probá con otra categoría.</p>
      </li>`;
    return;
  }

  places.forEach(place => {
    const cfg = CATEGORY_CONFIG[place.category];
    const li = document.createElement('li');
    li.className = `place-card${activePlaceId === place.id ? ' active' : ''}`;
    li.dataset.id = place.id;
    li.setAttribute('role', 'button');
    li.setAttribute('tabindex', '0');
    li.setAttribute('aria-label', `Ver ${place.name}`);

    li.innerHTML = `
      <span class="place-card-dot" style="background:${cfg.color};"></span>
      <div class="place-card-body">
        <p class="place-card-name">${place.name}</p>
        <p class="place-card-meta">${place.type}</p>
        <span class="place-card-tag tag-${place.category}">${cfg.label}</span>
      </div>`;

    li.addEventListener('click', () => selectPlace(place.id));
    li.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') selectPlace(place.id); });

    list.appendChild(li);
  });
}

/* ─────────────────────────────────────────────
   6. MAPA: marcadores
   ───────────────────────────────────────────── */
function clearMarkers() {
  Object.values(markers).forEach(m => m.remove());
  markers = {};
}

function addMarkers(places) {
  places.forEach(place => {
    const icon = createMarkerIcon(place.category, false);
    const cfg = CATEGORY_CONFIG[place.category];

    const popupContent = `
      <div class="popup-inner">
        <p class="popup-category" style="color:${cfg.color};">${cfg.emoji} ${cfg.label}</p>
        <p class="popup-name">${place.name}</p>
        <p class="popup-address">${place.address}</p>
        <button class="popup-cta" onclick="selectPlace(${place.id})">Ver detalle</button>
      </div>`;

    const marker = L.marker([place.lat, place.lng], { icon })
      .addTo(map)
      .bindPopup(popupContent, { maxWidth: 240 });

    marker.on('click', () => {
      highlightMarker(place.id);
    });

    markers[place.id] = marker;
  });
}

function highlightMarker(id) {
  // Resetear todos los íconos
  getFilteredPlaces().forEach(p => {
    if (markers[p.id]) {
      markers[p.id].setIcon(createMarkerIcon(p.category, false));
    }
  });
  // Activar el seleccionado
  if (markers[id]) {
    const place = PLACES.find(p => p.id === id);
    markers[id].setIcon(createMarkerIcon(place.category, true));
  }
}

/* ─────────────────────────────────────────────
   7. SELECCIÓN DE LUGAR (panel + mapa + modal)
   ───────────────────────────────────────────── */
window.selectPlace = function(id) {
  activePlaceId = id;
  const place = PLACES.find(p => p.id === id);
  if (!place) return;

  // Actualizar cards del panel
  document.querySelectorAll('.place-card').forEach(el => {
    el.classList.toggle('active', parseInt(el.dataset.id) === id);
  });

  // Ir al marcador y abrir popup
  highlightMarker(id);
  map.setView([place.lat, place.lng], 15, { animate: true, duration: 0.5 });
  markers[id]?.openPopup();

  // Abrir modal
  openModal(place);
};

/* ─────────────────────────────────────────────
   8. MODAL
   ───────────────────────────────────────────── */
function openModal(place) {
  const cfg = CATEGORY_CONFIG[place.category];

  document.getElementById('modal-badge').textContent = `${cfg.emoji} ${cfg.label}`;
  document.getElementById('modal-badge').style.background = cfg.color;
  document.getElementById('modal-badge').className =
    `modal-badge badge-${place.category}`;

  document.getElementById('modal-name').textContent = place.name;
  document.getElementById('modal-type').textContent = place.type;
  document.getElementById('modal-address-text').textContent = place.address;
  document.getElementById('modal-info').textContent = place.info;

  const tagsEl = document.getElementById('modal-tags');
  tagsEl.innerHTML = place.tags.map(t =>
    `<span class="modal-tag">${t}</span>`
  ).join('');

  const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(place.name + ' ' + place.address)}`;
  document.getElementById('modal-cta').href = mapsUrl;

  const overlay = document.getElementById('modal-overlay');
  overlay.removeAttribute('hidden');
  document.getElementById('modal-close').focus();
}

function closeModal() {
  document.getElementById('modal-overlay').setAttribute('hidden', '');
  activePlaceId = null;
  document.querySelectorAll('.place-card').forEach(el => el.classList.remove('active'));
  // Resetear íconos
  getFilteredPlaces().forEach(p => {
    if (markers[p.id]) markers[p.id].setIcon(createMarkerIcon(p.category, false));
  });
}

/* ─────────────────────────────────────────────
   9. FILTROS
   ───────────────────────────────────────────── */
function applyFilter(category) {
  activeCategory = category;
  activePlaceId = null;
  closeModal();

  // Actualizar botones
  document.querySelectorAll('.filter-btn').forEach(btn => {
    const isActive = btn.dataset.category === category;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive);
  });

  const filtered = getFilteredPlaces();
  clearMarkers();
  addMarkers(filtered);
  renderPlacesList(filtered);
  updateStatCount(filtered.length);
  updatePanelCount(filtered.length);

  // Ajustar vista del mapa
  if (filtered.length > 0) {
    const bounds = filtered.map(p => [p.lat, p.lng]);
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15, animate: true });
  }
}

/* ─────────────────────────────────────────────
   10. INICIALIZACIÓN
   ───────────────────────────────────────────── */
function initMap() {
  // Centrar en Buenos Aires
  map = L.map('map', {
    center: [-34.595, -58.420],
    zoom: 13,
    zoomControl: true,
    attributionControl: true,
  });

  // Tiles: OpenStreetMap con estilo limpio
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
  }).addTo(map);

  // Ocultar loading cuando el mapa cargue
  map.whenReady(() => {
    setTimeout(() => {
      document.getElementById('map-loading').classList.add('hidden');
    }, 400);
  });

  // Cerrar modal al hacer clic fuera
  map.on('click', () => {
    if (activePlaceId) closeModal();
  });

  // Cargar todos los lugares al inicio
  applyFilter('all');
}

function init() {
  // Footer año
  document.getElementById('footer-year').textContent = new Date().getFullYear();

  // Botones de filtro
  document.getElementById('legend-filters').addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (btn) applyFilter(btn.dataset.category);
  });

  // Cerrar modal
  document.getElementById('modal-close').addEventListener('click', closeModal);
  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });

  // Tecla Escape para cerrar modal
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
  });

  // Iniciar mapa
  initMap();
}

// Esperar a que cargue el DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}



