const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const moviesContainer = document.getElementById("moviesContainer");

const movieModal = document.getElementById("movieModal");
const modalContent = document.getElementById("modalContent");
const closeModal = document.getElementById("closeModal");

// Replace with your OMDb API Key
const API_KEY = "4e43b340";

// Search Movies
async function searchMovies() {

  const searchText = searchInput.value.trim();

  if (searchText === "") {
    alert("Please enter movie name");
    return;
  }

  const url = `https://www.omdbapi.com/?s=${searchText}&apikey=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  displayMovies(data.Search);
}

// Display Movies
function displayMovies(movies) {

  moviesContainer.innerHTML = "";

  if (!movies) {
    moviesContainer.innerHTML = `
      <p class="text-center col-span-full text-red-400 text-xl">
        Movie not found
      </p>
    `;
    return;
  }

  movies.forEach(movie => {

    const card = document.createElement("div");

    card.className =
      "bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:scale-105 transition duration-300";

    card.innerHTML = `
      <img
        src="${movie.Poster}"
        alt="${movie.Title}"
        class="w-full h-96 object-cover"
      />

      <div class="p-4">
        <h2 class="text-lg font-bold">${movie.Title}</h2>

        <p class="text-gray-400 mt-2">
          Year: ${movie.Year}
        </p>

        <button
          onclick="getMovieDetails('${movie.imdbID}')"
          class="mt-4 w-full bg-yellow-400 text-black py-2 rounded-lg font-semibold hover:bg-yellow-500"
        >
          View Details
        </button>
      </div>
    `;

    moviesContainer.appendChild(card);
  });
}

// Get Movie Details
async function getMovieDetails(id) {

  const url = `https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`;

  const response = await fetch(url);
  const movie = await response.json();

  movieModal.classList.remove("hidden");
  movieModal.classList.add("flex");

  modalContent.innerHTML = `
    <div class="grid md:grid-cols-2 gap-6">

      <img
        src="${movie.Poster}"
        class="w-full rounded-lg"
      />

      <div>
        <h2 class="text-3xl font-bold text-yellow-400">
          ${movie.Title}
        </h2>

        <p class="mt-3">
          <span class="font-semibold">Year:</span>
          ${movie.Year}
        </p>

        <p class="mt-2">
          <span class="font-semibold">Genre:</span>
          ${movie.Genre}
        </p>

        <p class="mt-2">
          <span class="font-semibold">IMDB Rating:</span>
          ⭐ ${movie.imdbRating}
        </p>

        <p class="mt-2">
          <span class="font-semibold">Actors:</span>
          ${movie.Actors}
        </p>

        <p class="mt-4 text-gray-300">
          ${movie.Plot}
        </p>
      </div>

    </div>
  `;
}

// Close Modal
closeModal.addEventListener("click", () => {

  movieModal.classList.add("hidden");
  movieModal.classList.remove("flex");

});

// Search Button Event
searchBtn.addEventListener("click", searchMovies);

// Enter Key Search
searchInput.addEventListener("keypress", function(e) {

  if (e.key === "Enter") {
    searchMovies();
  }

});