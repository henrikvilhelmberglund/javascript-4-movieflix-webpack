import "./assets/scss/main.scss";
import { FetchResult } from "../types/api";
import { Movie } from "../types/movie";

const pageNumber = document.querySelector("#pageNo") as HTMLSpanElement;
const pages = document.querySelector("#pages") as HTMLSpanElement;
let criteria = "";

document
  .querySelector("#gotoFirst")!
  .addEventListener("click", onGotoFirstPageHandler);
document
  .querySelector("#gotoPrevious")!
  .addEventListener("click", onGotoPrevHandler);
document
  .querySelector("#gotoNext")!
  .addEventListener("click", onGotoNextPageHandler);
document
  .querySelector("#gotoLast")!
  .addEventListener("click", onGotoLastPageHandler);
document.querySelector("#searchForm")!.addEventListener("submit", onSearch);

let result;

const listPopularMovies = async (page = 1) => {
  let data;
  if (criteria && criteria.length > 0) {
    // result = await fetch("localhost:3001/api/v1/movies/search", page, criteria);
    result = await fetch(`http://localhost:3001/api/v1/movies/search?page=${page}`);
    data = await result.json();
  } else {
    // result = await fetch("localhost:3001/api/v1/movie/list", page);
    result = await fetch(`http://localhost:3001/api/v1/movies/list?page=${page}`);
    data = await result.json();
  }

  displayMovies(data.result.results);
  displayPagination(data.result);
};

const displayPagination = (data: FetchResult) => {
  const pages = data.total_pages > 500 ? 500 : data.total_pages;
  const currentPage = document.querySelector("#pageNo") as HTMLSpanElement;
  const numOfPages = document.querySelector("#pages") as HTMLSpanElement;
  currentPage.innerHTML = `${data.page}`;
  numOfPages.innerHTML = `${pages}`;
};

function onGotoFirstPageHandler() {
  listPopularMovies(1);
}

function onGotoPrevHandler() {
  let page = +pageNumber.innerHTML;
  page > 1 ? page-- : 1;
  listPopularMovies(page);
}

function onGotoNextPageHandler() {
  const numOfPages = +pages.innerHTML;
  let page = +pageNumber.innerHTML;
  page < numOfPages ? page++ : 500;
  listPopularMovies(page);
}

function onGotoLastPageHandler() {
  listPopularMovies(+pages.innerHTML);
}

function displayMovies(movies: Movie[]) {
  document.querySelector("#top-movies")!.innerHTML = "";
  movies.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");

    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        ${
          movie.poster_path
            ? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}"/>`
            : `<img src="./assets/images/No-Image.jpg" alt="${movie.title}" />`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">
          <small class="text-muted">Premiär datum: ${movie.release_date}</small>
        </p>
      </div>
    `;

    document.querySelector("#top-movies")!.appendChild(div);
  });
}

async function onSearch(e: Event) {
  e.preventDefault();

  let page = 1;
  criteria = document.querySelector<HTMLInputElement>("#searchInput")!.value;

  if (criteria === "") {
    listPopularMovies();
    return;
  }

  // const result = await fetch("localhost:3001/api/v1/movies/search", page, criteria);
  const result = await fetch(`http://localhost:3001/api/v1/movies/search/${criteria}`);
  let data = await result.json();

  displayPagination(data.result);
  displayMovies(data.result.results);
}

listPopularMovies();
