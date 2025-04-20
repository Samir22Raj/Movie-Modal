const movies = document.querySelectorAll(".movie");
const modal = document.querySelector("#myModal");
const modalImg = document.querySelector('#modalImg');
const modalTitle = document.querySelector('.modal-movie-title');
const modalPlot = document.querySelector('.modal-movie-plot');
const modalRating = document.querySelector('#rating');
const modalRealeased = document.querySelector('#released');
const modalGenre = document.querySelector('#genre');
const modalActors = document.querySelector('#actors');
const modalRuntime = document.querySelector('#runtime');

for(let movie of movies){
  const poster = movie.querySelector(".poster");
  const playIcon = poster.querySelector(".fa-circle-play");
  const movieTitle = movie.querySelector(".movie-title");

  /*for blur bg and play icon on mouse over poster*/
  poster.addEventListener("mouseover", () => {
    if(playIcon.classList.contains("hidden")){
      playIcon.classList.remove("hidden");
    }
  });

  poster.addEventListener("mouseout", () => {
    if(!playIcon.classList.contains("hidden")){
      playIcon.classList.add("hidden");
    }
  });

  movie.addEventListener("click", () => {
    const title = movieTitle.innerText;
    fetchJSONData(title);
  })

  async function fetchJSONData(title) {
    try{
      const response = await fetch("movie_details.json");
      const data = await response.json();
      for(date of data){
        if(title == date.Title){
          const posterImg = poster.querySelector("figure img");
          modal.style.display = "flex"; 
          modalImg.src = posterImg.src;
          modalImg.width = posterImg.width;
          modalImg.height = posterImg.height;
          modalImg.alt = posterImg.alt;
          modalTitle.innerText = date.Title;
          modalPlot.innerText = date.Plot;
          modalRating.innerText = date.imdbRating;
          modalRealeased.innerText = date.Released;
          modalGenre.innerText = date.Genre;
          modalActors.innerText = date.Actors;
          modalRuntime.innerText = date.Runtime;
        }
      }
    }
    catch(err){
      console.error('Failed to fetch data:', err);
    }
  }
};

// Close the modal when clicking the close button
document.querySelector(".close").addEventListener("click", () => {
    modal.style.display = "none";
});

/*for sticky header on mobile*/
const header = document.querySelector("header");
const main = document.querySelector("main");
main.style.paddingTop = header.offsetHeight;

/*Hamburger Menu for mobile*/
const hamburgerMenu = document.querySelector(".hamburger");
const mainMenu = document.querySelector(".menu");
hamburgerMenu.addEventListener("click", hamburger);

function hamburger() {
  if (hamburgerMenu.children[0].classList.contains("fa-bars")) {
    hamburgerMenu.children[0].classList.remove("fa-bars");
    hamburgerMenu.children[0].classList.add("fa-xmark");
    mainMenu.classList.remove("hidden");
  } else {
    hamburgerMenu.children[0].classList.add("fa-bars");
    hamburgerMenu.children[0].classList.remove("fa-xmark");
    mainMenu.classList.add("hidden");
  }
}

/*For hamburger menu on responsive*/
const mediaQueryList = window.matchMedia("(min-width: 1024px)");

function screenTest(media) {
  // If media query matches
  if (media.matches) { 
    mainMenu.classList.remove("hidden");
  } else if (!media.matches && hamburgerMenu.children[0].classList.contains("fa-bars")) {
    mainMenu.classList.add("hidden");
  }
}

screenTest(mediaQueryList);
mediaQueryList.addEventListener("change", () => {
  screenTest(mediaQueryList);
});