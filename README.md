## Grupo B - Equipo 10 ( Grupo de 19 a 21 hs )
_Curso de Programación Asistida con IA - Chicas en Tecnología_ 🚀

# 🚦 CeliaCheck
### *"Encontrá alimentos y lugares aptos para vos."*

---

## 📌 Definición de la problemática

Las personas con condiciones alimentarias específicas como **celiaquía, diabetes, veganismo y vegetarianismo** enfrentan dificultades cotidianas que afectan su calidad de vida y su participación social:

- 🔍 **No saben si un alimento es apto** para su condición solo leyendo la etiqueta.
- 🏷️ **Desconocen qué significan** sellos como `Sin TACC`, `Contiene gluten` o qué es el índice glucémico.
- 🍽️ **Les resulta difícil encontrar lugares** donde comer tranquilas al salir con familia o amigos.
- 👨‍👩‍👧 **La exclusión social** es real: una familia puede tener integrantes celíacos, diabéticos y veganos al mismo tiempo, y encontrar un lugar donde todos puedan comer es un verdadero desafío.

> En Argentina, **1 de cada 100 personas** tiene celiaquía y se estima que el **70% está sin diagnosticar**. La falta de información accesible agrava esta situación.

---

## 🌍 Relación con los ODS

CeliaCheck se alinea con los **Objetivos de Desarrollo Sostenible** de la ONU (Agenda 2030):

| ODS | Objetivo | Cómo lo abordamos |
|-----|----------|-------------------|
| ❤️ **ODS 3** | Salud y bienestar | Ayudamos a tomar decisiones alimentarias informadas y seguras, reduciendo el riesgo de consumir alimentos perjudiciales por desconocimiento |
| ⚖️ **ODS 10** | Reducción de las desigualdades | Reducimos la brecha de información alimentaria y promovemos la inclusión de personas con condiciones específicas en espacios gastronómicos |
| 🌾 **ODS 2** | Hambre cero | Promovemos una alimentación segura y nutritiva para personas con restricciones dietarias |
| 📚 **ODS 4** | Educación de calidad | Difundimos información clara sobre etiquetas, ingredientes y alimentación saludable de forma accesible para todos |

---

## 💡 Solución tecnológica

**CeliaCheck** es un sitio web desarrollado con `HTML`, `CSS` y `JavaScript` que centraliza tres herramientas:

### 1. 🔴🟡🟢 Verificador de alimentos — Semáforo alimenticio

El usuario selecciona su perfil y escribe el nombre de un alimento. El sistema responde con un semáforo:

```
🟢 APTO        →  El alimento es seguro para tu condición
🟡 REVISAR     →  Puede ser apto, verificá ciertos ingredientes  
🔴 NO APTO     →  Contiene ingredientes problemáticos
```

Y una explicación del motivo:
> *"Este producto no es apto para personas celíacas porque contiene harina de trigo (gluten)."*

> **💬 Nota:** El verificador funciona con una búsqueda por nombre en JavaScript con base de datos local. La detección por escaneo de imagen fue descartada en esta versión por su complejidad técnica (requeriría APIs externas de reconocimiento de imágenes).

---

### 2. 📚 Sección educativa — ¿Qué significa?

Para cada perfil alimentario se explica:
- ❌ Qué alimentos evitar
- 🏷️ Qué significan las etiquetas (Sin TACC, índice glucémico, etc.)
- ✅ Qué alternativas seguras existen

---

### 3. 🗺️ Mapa inclusivo

Mapa con restaurantes, cafeterías y locales identificados por colores:

| Ícono | Color | Perfil |
|-------|-------|--------|
| 🟦 | Azul | Celíacos |
| 🟩 | Verde | Diabéticos |
| 🟨 | Amarillo | Veganos |
| 🟧 | Naranja | Vegetarianos |
| ⭐ | Morado | Multiaptos (para toda la familia) |

---

## 🎨 Moodboard

El diseño visual de CeliaCheck está inspirado en:

- **Tipografía:** `Archivo Black` — bold, impactante, moderna (como el texto "semáforo" del moodboard)
- **Sistema visual central:** 🚦 El semáforo — metáfora de apto / revisar / no apto
- **Estética:** Inspirada en sitios como *Veganuary* y *DAP* — colorida, orgánica, fácil de leer
- **Iconografía:** 🌾 🌽 🐄 🥑 — ingredientes naturales que comunican alimentación real

### Paleta de colores

| Color | Hex | Uso |
|-------|-----|-----|
| 🟩 Verde principal | `#4CAF50` | Resultado Apto, botones primarios |
| 🟩 Verde claro | `#A5D6A7` | Acentos, bordes |
| 🟨 Amarillo | `#FFD600` | Resultado Revisar, sección escáner |
| 🟧 Naranja | `#FF7043` | Vegetariano, alertas |
| 🟦 Azul suave | `#42A5F5` | Celíaco en mapa |
| ⬜ Beige claro | `#F5F5DC` | Fondo hero y perfil |
| ⬜ Blanco | `#FFFFFF` | Fondos de tarjetas |
| ⬛ Gris oscuro | `#424242` | Texto principal |

---

## Comentarios sobre la experiencia 
Sección de experiencias de la comunidad
Un espacio donde las personas pueden compartir cómo es su vida cotidiana con una condición alimentaria específica: qué dificultades encuentran, qué productos les resultaron útiles o qué lugares recomiendan.
¿Por qué la incluimos?

Muchas veces la información técnica no alcanza. Escuchar la experiencia real de otra persona que vive lo mismo genera confianza, reduce la sensación de aislamiento y construye comunidad.
---

## 👥 Equipo

> Proyecto desarrollado en el marco del programa **CET Programación Asistida con IA 2026** · Equipo 10 · Grupo B

*"Queremos que todas las personas puedan elegir alimentos y compartir comidas con confianza, sin sentirse excluidas."* 🌾

---
