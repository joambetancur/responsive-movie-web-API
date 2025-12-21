const API_KEY = '7f6c379eb1d27a1d2e47e9926ca54155';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

// Selectores del DOM
const genreSelect = document.querySelector('select.genre');
const yearSelect = document.querySelector('select.year');
const moviesContainer = document.getElementById('movies-container');
const searchForm = document.querySelector('.navbar-form');
const searchInput = document.querySelector('.navbar-form-search');
const filterRadios = document.querySelectorAll('input[name="grade"]');
const loadMoreBtn = document.querySelector('.load-more');

// Géneros 
const genres = {
    "action": 28,
    "comedy": 35,
    "thriller": 53,
    "horror": 27,
    "adventure": 12,
    "animation": 16,
    "crime": 80,
    "sci-fi": 878,
    "historical": 36
};

// Variables de paginacion
let currentPage = 1;
let currentURL = buildURL({ sortBy: 'popularity.desc' });

// Función para construir URLs dinámicamente 
function buildURL({ sortBy = 'popularity.desc', genre, yearRange, query }) {
    let url;

    if (query) {
        url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
    } else {
        url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=${sortBy}`;

        if (genre && genres[genre]) {
            url += `&with_genres=${genres[genre]}`;
        }

        if (yearRange && yearRange !== "all the years") {
            if (yearRange.includes("-")) {
                const [start, end] = yearRange.split("-");
                url += `&primary_release_date.gte=${start}-01-01&primary_release_date.lte=${end}-12-31`;
            } else {
                url += `&primary_release_year=${yearRange}`;
            }
        }
    }

    return url;
}

// Obtener películas 
async function getMovies(url, page = 1) {
    try {
        const urlWithPage = `${url}&page=${page}`;
        const res = await fetch(urlWithPage);
        const data = await res.json();
        return data.results || [];
    } catch (error) {
        console.error("Error obteniendo películas:", error);
        return [];
    }
}

// Función para renderizar películas 
function renderMovies(movies, isLoadMore = false) {
    if (!isLoadMore) {
        moviesContainer.innerHTML = '';
    }

    if (movies.length === 0) {
        moviesContainer.innerHTML = `<h2 class="no-results">No se encontraron resultados</h2>`;
        return;
    }

    movies.forEach(movie => {
        const { title, poster_path, vote_average, release_date } = movie;
        const year = release_date ? release_date.split('-')[0] : "N/A";
        const imagePath = poster_path ? IMG_URL + poster_path : 'images/placeholder.jpg';

        const movieEl = document.createElement('div');
        movieEl.classList.add('movie-card');
        movieEl.innerHTML = `
            <div class="card-head">
                <img src="${imagePath}" alt="${title}" class="card-img" loading="lazy">
                <div class="card-overlay">
                    <div class="rating">
                        <ion-icon name="star"></ion-icon>
                        <span>${vote_average.toFixed(1)}</span>
                    </div>
                    <div class="play">
                        <ion-icon name="play-circle-outline"></ion-icon>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <h3 class="card-title">${title}</h3>
                <div class="card-info">
                    <span class="year">${year}</span>
                </div>
            </div>
        `;
        moviesContainer.appendChild(movieEl);
    });
}

// Función que combina ambas
async function fetchMovies(url, isLoadMore = false) {
    const movies = await getMovies(url, currentPage);
    renderMovies(movies, isLoadMore);
}

// Filtros de Radio funcionando
filterRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        currentPage = 1;
        let sortBy = 'popularity.desc';
        if (radio.id === 'newest') sortBy = 'primary_release_date.desc';
        if (radio.id === 'featured') sortBy = 'vote_average.desc';

        currentURL = buildURL({ sortBy });
        fetchMovies(currentURL);
    });
});

// Buscador funcionando
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const searchTerm = searchInput.value.trim();

    if (searchTerm) {
        currentPage = 1;
        currentURL = buildURL({ query: searchTerm });
        fetchMovies(currentURL);
        searchInput.value = '';
    }
});

// Botón LOAD MORE funcionando
loadMoreBtn.addEventListener('click', () => {
    currentPage++;
    fetchMovies(currentURL, true);
});

// Filtros (Género y Año) funcionando
function applyFilters() {
    currentPage = 1;
    const genre = genreSelect.value.toLowerCase();
    const yearRange = yearSelect.value;

    currentURL = buildURL({ genre, yearRange });
    fetchMovies(currentURL);
}

genreSelect.addEventListener('change', applyFilters);
yearSelect.addEventListener('change', applyFilters);

// Funcion imagenes categoria
async function loadCategoryImages() {
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(async (card) => {
        const nameElement = card.querySelector('.name');
        const imgElement = card.querySelector('.card-img');
        const categoryName = nameElement.textContent.trim().toLowerCase();
        const genreId = genres[categoryName];

        if (genreId) {
            try {
                const response = await fetch(buildURL({ genre: categoryName }));
                const data = await response.json();

                if (data.results && data.results.length > 0) {
                    const imagePath = data.results[0].backdrop_path;
                    if (imagePath) {
                        imgElement.src = `https://image.tmdb.org/t/p/w500${imagePath}`;
                    }
                }
            } catch (error) {
                console.error(`Error cargando imagen para ${categoryName}:`, error);
            }
        }
    });
}

loadCategoryImages();

// Funcion imagenes de categoria funcionando
async function setupCategoryInteractions() {
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        card.style.cursor = 'pointer';

        card.addEventListener('click', () => {
            const categoryName = card.querySelector('.name').textContent.trim().toLowerCase();
            const genreId = genres[categoryName];

            if (genreId) {
                currentPage = 1;
                currentURL = buildURL({ genre: categoryName });
                fetchMovies(currentURL);

                document.getElementById('movies-container').scrollIntoView({ behavior: 'smooth' });

                if (genreSelect) {
                    genreSelect.value = categoryName;
                }
            }
        });
    });
}

setupCategoryInteractions();

// Carga inicial
fetchMovies(currentURL);
