# 🎮 Boggle - Juego de Palabras

Implementación web del clásico juego Boggle, donde los jugadores deben encontrar palabras en un tablero de 4x4 letras.

## 📝 Descripción
Juego de palabras desarrollado con HTML5, CSS3 y JavaScript ES5 puro (sin frameworks).

## 🎯 Características principales
- Tablero 4x4 con letras aleatorias (dados oficiales Boggle)
- Temporizador configurable (1, 2 o 3 minutos)
- Validación de palabras con diccionario
- Sistema de puntuación
- Ranking con LocalStorage
- Diseño responsive con Flexbox

## 🛠️ Tecnologías
- HTML5
- CSS3 (Flexbox)
- JavaScript ES5 (estricto)

## 📦 Estructura del proyecto
```
boggle/
├── recursos/
│   ├── datos/
│   │   └── diccionario-fallback.json
│   └── imagenes/
├── estilos/
│   ├── reset.css
│   ├── estilos-base.css
│   ├── juego.css
│   ├── modal.css
│   └── responsive.css
├── scripts/
│   ├── juego/
│   │   ├── dados.js
│   │   ├── tablero.js
│   │   ├── temporizador.js
│   │   ├── validacion-palabras.js
│   │   └── puntaje.js
│   ├── interfaz/
│   │   ├── dom.js
│   │   ├── modales.js
│   │   └── eventos.js
│   ├── principal.js
│   └── contacto.js
├── documentacion/
├── index.html
├── contacto.html
└── README.md
```

## 🚀 Cómo jugar
# 🎲 Reglas del Juego

El juego comienza al **ordenarse las letras en la cuadrícula**, momento que coincide con el **inicio del temporizador**.

---

## ⏱️ Configuración del Tiempo

El temporizador puede configurarse a:
* **1 minuto**
* **2 minutos**
* **3 minutos**

---

## 🔎 Criterios para Buscar Palabras

Para que una secuencia de letras sea considerada una palabra válida, debe cumplir los siguientes criterios:

* **Longitud Mínima:** Las palabras deben tener al menos **tres (3) letras**.
* **Adyacencia:** Cada letra después de la primera debe ser **vecina horizontal, vertical o diagonal** de la anterior.
* **Uso Único de Casilla:** Ninguna casilla de letras individual se puede utilizar **más de una vez** en una misma palabra.
* **Derivaciones:** Se permiten **múltiples formas** de la misma palabra, como formas singulares y plurales y otras derivaciones.
* **Palabras dentro de Palabras:** Se permiten palabras dentro de otras, como "casa" y "casamiento".
* **Exclusiones:** **No se aceptan** nombres propios, artículos ni pronombres.

---

## ✍️ Dinámica del Juego

El jugador debe ir guardando cada palabra que encuentra, lo que genera una **puntuación acumulada** hasta que finalice el tiempo de juego.

### 🚫 Palabras no Válidas

Las palabras ingresadas deben ser **palabras reales** (deben existir en el diccionario desde el cual se está consumiendo la data).

* **Penalización:** En caso de ingresar una palabra no válida, habrá una penalización (a gusto del programador).

---

## 💯 Sistema de Puntuación Sugerido

| Longitud de la Palabra (letras) | Puntos |
| :------------------------------ | :----- |
| 3, 4                            | 1      |
| 5                               | 2      |
| 6                               | 3      |
| 7                               | 5      |
| 8+                              | 11     |

## 💻 Instalación Local

1. Clona el repositorio:
```bash
git clone https://github.com/JIB944/Boogle.git
```

2. Abre `index.html` en tu navegador

No requiere instalación de dependencias ni servidor.