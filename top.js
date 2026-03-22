const API_KEY = 'ad726331'; // Get a free key at https://www.omdbapi.com/apikey.aspx
const sortSelect = document.getElementById('sortBy');
const resultsDiv = document.getElementById('results');
const messageDiv = document.getElementById('message');

// Curated lists of IMDb IDs (OMDB has no "top" endpoint)
const topRated = [
  'tt0111161', // The Shawshank Redemption
  'tt0068646', // The Godfather
  'tt0468569', // The Dark Knight
  'tt0071562', // The Godfather Part II
  'tt0050083', // 12 Angry Men
  'tt0108052', // Schindler's List
  'tt0167260', // The Lord of the Rings: The Return of the King
  'tt0110912', // Pulp Fiction
  'tt0120737', // The Lord of the Rings: The Fellowship of the Ring
  'tt0137523', // Fight Club
];

const mostPopular = [
  'tt0848228', // The Avengers
  'tt4154796', // Avengers: Endgame
  'tt0468569', // The Dark Knight
  'tt1375666', // Inception
  'tt0816692', // Interstellar
  'tt0133093', // The Matrix
  'tt2382320', // No Time to Die
  'tt1856101', // Blade Runner 2049
  'tt0076759', // Star Wars
  'tt0109830', // Forrest Gump
];

sortSelect.addEventListener('change', loadMovies);
loadMovies();

async function loadMovies() {
  const list = sortSelect.value === 'rating' ? topRated : mostPopular;

  resultsDiv.innerHTML = '';
  messageDiv.textContent = 'Loading...';

  try {
    const promises = list.map((id) =>
      fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}`).then((r) => r.json())
    );
    const movies = await Promise.all(promises);

    messageDiv.textContent = '';
    movies.forEach((movie, i) => {
      resultsDiv.innerHTML += createCard(movie, i + 1);
    });
  } catch {
    messageDiv.textContent = 'Something went wrong. Please try again.';
  }
}

function createCard(movie, rank) {
  const poster = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Poster';
  const rating = movie.imdbRating || 'N/A';
  return `
    <div class="movie-card">
      <div class="poster-wrap">
        <span class="rank">${rank}</span>
        <img src="${poster}" alt="${movie.Title}">
      </div>
      <div class="info">
        <h3>${movie.Title}</h3>
        <p>${movie.Year} &middot; ${movie.Genre}</p>
        <p class="rating">IMDb: ${rating}</p>
      </div>
    </div>
  `;
}
