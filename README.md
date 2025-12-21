# 🎬 CineBox - Movie & TV Explorer

CineBox es una aplicación web moderna y dinámica que permite a los usuarios explorar, buscar y filtrar películas y series de televisión en tiempo real. Este proyecto consume datos en vivo desde la API de **The Movie Database (TMDB)**.

### Para ver: 

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
* **Carga Infinita (Paginación)**: Botón "Load More" funcional que permite explorar miles de resultados sin recargar la página.
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
