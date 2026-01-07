# 🎬 CineBox – Movie & TV Explorer (Vanilla JS + TMDB API)

Aplicación web moderna para explorar, buscar y filtrar películas y series en tiempo real utilizando la API de The Movie Database (TMDB).
El proyecto está enfocado en rendimiento, experiencia de usuario, accesibilidad y código limpio, simulando un entorno real de desarrollo frontend.

### Para ver: https://responsive-movie-web.vercel.app/ 

## 📌 Descripción del Proyecto

CineBox permite a los usuarios descubrir contenido audiovisual de forma rápida e intuitiva, ofreciendo búsqueda en tiempo real, filtros avanzados y paginación dinámica sin recargar la página.
El objetivo del proyecto fue construir una SPA-like experience usando JavaScript Vanilla, aplicando buenas prácticas modernas antes de migrar a frameworks como React.

## 🛠️ Tecnologías Utilizadas

* **HTML5 Semántico**: Para una estructura accesible y optimizada para SEO.
* **CSS3 Avanzado**:
    * Arquitectura modular (Variables, Media Queries, Accesibilidad).
    * Diseño Responsivo con **CSS Grid** y **Flexbox**.
* **JavaScript (ES6+)**:
    * Consumo de APIs REST mediante `fetch`.
    * Manejo de asincronía con `async/await`.
    * Manipulación dinámica del DOM.
* **TMDB API**: Como fuente de datos principal.
* **Ionicons**: Para una interfaz visual intuitiva con iconos vectoriales.

## ✨ Características Principales

* **Buscador en Tiempo Real**: Encuentra cualquier título disponible en la base de datos de TMDB.
* **Filtrado Inteligente**: Sistema de filtros por **género** (Acción, Comedia, Terror, etc.) y por **rango de años**.
* **Paginacion Incremental (Load More)**: Botón "Load More" funcional que permite explorar miles de resultados sin recargar la página.
* **Tarjetas de Categoría Dinámicas**: Las categorías cargan automáticamente imágenes de fondo basadas en las películas más populares de cada género.
* **Experiencia de Usuario (UX)**:
    * *Spinners* de carga para estados de espera.
    * Mensajes de error si no se encuentran resultados.
    * Navegación suave (Smooth scroll) al filtrar.
* **Accesibilidad (A11y)**: Inclusión de soporte para usuarios con sensibilidad al movimiento mediante `prefers-reduced-motion`.

## 🧠 Desafíos Superados

* **Gestión de Datos Asíncronos**: Implementación de lógica para manejar múltiples peticiones simultáneas (como cargar imágenes de fondo para todas las categorías al inicio).
* **Lógica de URLs Dinámicas**: Creación de una función robusta para construir consultas a la API basadas en múltiples parámetros seleccionados por el usuario.
* **Diseño Adaptable**: Mantenimiento de una interfaz limpia y funcional tanto en móviles como en monitores de escritorio mediante una hoja de estilos de media-queries dedicada.

## ⚙️ Decisiones Técnicas

- Se utilizó JavaScript vanilla en lugar de frameworks para reforzar el dominio del DOM y la asincronía.
- La paginación incremental ("Load More") fue elegida sobre infinite scroll para evitar peticiones innecesarias.
- Se implementó debounce en el buscador para reducir llamadas a la API.
- Se separó la lógica de construcción de URLs para facilitar el mantenimiento y escalabilidad.

## Mejoras Planeadas

- Migración del proyecto a React
- Componentización
- Hooks (useState, useEffect)
- Custom hooks para consumo de API
- Implementación de TypeScript
- Favoritos persistentes (LocalStorage)

## ⚠️ Nota sobre la API Key
Por motivos de simplicidad en este portafolio, la API Key se encuentra en el frontend. Soy consciente de que en aplicaciones escalables esto debe gestionarse mediante Variables de Entorno o un Proxy Server para evitar su exposición.
