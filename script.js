const API_KEY = 'ad726331'; // Get a free key at https://www.omdbapi.com/apikey.aspx
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsDiv = document.getElementById('results');
const messageDiv = document.getElementById('message');

searchBtn.addEventListener('click', searchMovies);
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') searchMovies();
});

async function searchMovies() {
  const query = searchInput.value.trim();
  if (!query) return;

  resultsDiv.innerHTML = '';
  messageDiv.textContent = 'Searching...';

  try {
    const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (data.Response === 'False') {
      messageDiv.textContent = data.Error || 'No results found.';
      return;
    }

    messageDiv.textContent = '';
    data.Search.forEach((movie) => {
      resultsDiv.innerHTML += createCard(movie);
    });
  } catch {
    messageDiv.textContent = 'Something went wrong. Please try again.';
  }
}

function createCard(movie) {
  const poster = movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/200x300?text=No+Poster';
  return `
    <div class="movie-card">
      <img src="${poster}" alt="${movie.Title}">
      <div class="info">
        <h3>${movie.Title}</h3>
        <p>${movie.Year} &middot; ${movie.Type}</p>
      </div>
    </div>
  `;
}
