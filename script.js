const API_KEY = '6336a29294d9f65e1797cc7a68902b39';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/movie/popular?' + 'api_key=' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const PLACEHOLDER_IMG_URL = 'https://www.altavod.com/assets/images/poster-placeholder.png';
const searchURL = BASE_URL + '/search/movie?' + 'api_key=' + API_KEY;

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const sort = document.getElementById('sort');

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

function sortMovies() {
  const sortOption = sort.value;

  if (sortOption === 'rating') {
    const movies = Array.from(main.children);
    const sortedMovies = movies.sort((a, b) => {
      const ratingA = parseFloat(a.querySelector('.vote-average').textContent);
      const ratingB = parseFloat(b.querySelector('.vote-average').textContent);
      return ratingB - ratingA;
    });

    main.innerHTML = '';
    sortedMovies.forEach(movie => {
      main.appendChild(movie);
    });
  } else {
    getPopularMovies();
  }
}

function showMovies(data) {
  main.innerHTML = '';

  data.forEach(movie => {
    const { title, poster_path, vote_average, overview } = movie;

    const posterPath = poster_path ? IMG_URL + poster_path : PLACEHOLDER_IMG_URL;

    const movieEL = document.createElement('div');
    movieEL.classList.add('movie');
    movieEL.innerHTML = `
      <img src="${posterPath}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span class="vote-average ${getColor(vote_average)}">${vote_average.toFixed(1)}</span>
      </div>
      <div class="overview">
        <h3>Overview</h3>
        ${overview}
      </div>
    `;

    main.appendChild(movieEL);
  });

  search.value = ''; // Clear the search box
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

sort.addEventListener('change', sortMovies);
