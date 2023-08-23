const search = document.querySelector(".search");
const searchBtn = document.querySelector(".search-btn");

const moviesList = document.querySelector(".movies-list");
const moviesContainer = document.querySelector(".movies-container");

const API_KEY = "807cdb2471c102a8b36109bfe0720eef";
const moviesArr = [];
let filterFlag = 0;

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchVal = search.value.toLowerCase().trim();

  if (searchVal == "")
    return;
  else {
    const filterMovies = moviesArr.filter(val => {
      if (val.title.toLowerCase().includes(searchVal)) {
        removePrevNotFound();
        filterFlag = 1;
        return val;
      }
    });

    if (filterMovies != "") {
      showMovie(filterMovies);
    } else {
      movieNotFound();
    }
  }
});

search.addEventListener("input", () => {
  const searchVal = search.value.toLowerCase().trim();

  const filterMovies = moviesArr.filter(val => {
    if (val.title.toLowerCase().includes(searchVal)) {
      removePrevNotFound();
      filterFlag = 1;
      return val;
    }
  });

  if (filterMovies != "") {
    showMovie(filterMovies);
  } else {
    movieNotFound();
  }
});

const fetchApi = async () => {
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US`;

  const response = await fetch(url);
  const { results } = await response.json();

  for (const res of results) {
    moviesArr.push(res);
  }
  showMovie(moviesArr);
}

const showMovie = movies => {
  if (filterFlag == 1) {
    let lists = Array.from(document.querySelectorAll("li"));
    for (const list of lists) {
      list.remove();
    }
  }

  for (const movie of movies) {
    const li = document.createElement("li");
    const img = document.createElement("img");
    const p = document.createElement("p");

    img.src = `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`;
    img.alt = `${movie.original_title}`;

    p.innerText = `${movie.title}`;
    p.classList.add("movie-title");

    li.append(img, p);
    moviesList.append(li);
  }
  filterFlag = 0;
}

const movieNotFound = () => {
  let lists = Array.from(document.querySelectorAll("li"));
  for (const list of lists) {
    list.remove();
  }
  
  removePrevNotFound();

  let notFound = document.createElement("span");
  notFound.className = "not-found";
  notFound.innerText = "Movies Not Found!";
  moviesContainer.appendChild(notFound);
};

const removePrevNotFound = () => {
  let prevNotFound = document.querySelector(".not-found");

  if(prevNotFound != null)
    prevNotFound.remove();
}

fetchApi();
