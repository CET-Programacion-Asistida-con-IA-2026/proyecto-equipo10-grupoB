// =============================================
// CeliaCheck — JavaScript
// =============================================

// ---- Perfil alimentario ----
function togglePerfil(btn) {
  btn.classList.toggle('active')
}

// ---- Semáforo ----
function cambiarSemaforo(color) {
  let semaforo = document.getElementById('semaforo')
  let resultado = document.getElementById('resultado')
  let sub = document.getElementById('resultado-sub')
  let tags = document.getElementById('tags')

  semaforo.classList.remove('verde', 'rojo', 'amarillo')

  if (color === 'verde') {
    semaforo.classList.add('verde')
    semaforo.textContent = '🟢'
    resultado.textContent = '✅ ¡Podés consumirlo!'
    sub.textContent = 'Este alimento es apto para tu alimentación'
    tags.innerHTML = '<span class="cc-tag ok">Sin TACC</span><span class="cc-tag ok">Vegano</span><span class="cc-tag neutral">Azúcar</span>'
  } else {
    semaforo.classList.add('rojo')
    semaforo.textContent = '🔴'
    resultado.textContent = '❌ No es apto para vos'
    sub.textContent = 'Este alimento contiene ingredientes no aptos'
    tags.innerHTML = '<span class="cc-tag bad">Gluten</span><span class="cc-tag warn">Lácteos</span><span class="cc-tag neutral">Sal</span>'
  }
}

// ---- Zona de escaneo ----
function simularEscaneo() {
  let zona = document.getElementById('scanZone')
  zona.classList.add('scanning')
  setTimeout(() => zona.classList.remove('scanning'), 2000)
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
