const API_KEY = '6336a29294d9f65e1797cc7a68902b39';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/movie/popular?' + 'api_key=' + API_KEY;

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not OK');
      }
      return res.json();
    })
    .then(data => {
      showMovies(data); // Call the showMovies function and pass the data
    })
    .catch(error => {
      console.error('Error:', error);
    });

  // Adding the curl code here
  fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', {
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MzM2YTI5Mjk0ZDlmNjVlMTc5N2NjN2E2ODkwMmIzOSIsInN1YiI6IjY0NjI2NzU5ZGJiYjQyMDE1MzA3MGFmOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M_mjTxF-5_5b7HlLLzCOBxldBegc_ToNFGIzA88N5NI',
      accept: 'application/json'
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Network response was not OK');
      }
      return res.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function showMovies(data) {
  // Handle and display the movie data as needed
  console.log(data);
  // Example: Loop through the movies and display their titles
  data.results.forEach(movie => {
    console.log(movie.title);
  });
}








