const API_KEY = '6336a29294d9f65e1797cc7a68902b39';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/movie/popular?' + 'api_key=' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + 'api_key=' + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getPopularMovies();

function getPopularMovies() {
  fetch(API_URL)
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not OK');
      }
      return res.json();
    })
    .then(data => {
      showMovies(data.results);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function searchMovies(query) {
  fetch(searchURL + '&query=' + query)
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not OK');
      }
      return res.json();
    })
    .then(data => {
      showMovies(data.results);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function showMovies(data) {
  main.innerHTML = '';

  data.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie;
    const movieEL = document.createElement('div');
    movieEL.classList.add('movie');
    movieEL.innerHTML = `
      <img src="${IMG_URL + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${overview}
      </div>
    `;

    main.appendChild(movieEL);
  });
}

function getColor(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const searchTerm = search.value.trim();

  if (searchTerm) {
    searchMovies(searchTerm);
  } else {
    getPopularMovies();
  }
});








