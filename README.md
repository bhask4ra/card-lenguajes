# Card API (Rick and Morty)

Proyecto basado en la arquitectura de `card-lenguajes`, adaptado para consumir una API REST pública (`Rick and Morty API`) compatible con redes con restricciones SSL/TLS.

## 🚀 Características implementadas

1. **Validación con PropTypes**:
   - `LanguageCard.jsx`: Valida rigurosamente los tipos requeridos (`nombre`, `anio`, `tipo`, `descripcion`, `emoji`, `color` y opcional `imagen`).
   - `FilterBar.jsx`: Valida las props `tipos` (Array de strings), `tipoActivo` (string) y `onSeleccionar` (función).

2. **Doble uso de `transform`**:
   - **CSS `transform`**: En `LanguageCard.css` se aplica `transform: translateY(-6px)` en `:hover` junto con transiciones fluidas, además de un sutil `transform: scale(1.1) rotate(4deg)` sobre el avatar. En `FilterBar.css` los botones utilizan `transform: translateY(-2px)` al interactuar.
   - **Data `transform`**: En `src/utils/transform.js` se implementa la función `transformCharacterList` / `transformCharacter` que adapta la respuesta de la API a la forma de datos requerida por las PropTypes de la tarjeta.

3. **API compatible y resiliente**:
   - Consume `https://rickandmortyapi.com/api/character`.
   - Incluye mecanismo de respaldo local (`fallbackData.js`) en caso de caída temporal de red o conexión offline.

## 🛠️ Instalación y ejecución

```bash
# Con Bun
bun install
bun dev

# O con npm
npm install
npm run dev
```
