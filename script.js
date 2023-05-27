'use strict';

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const PROFILE_BASE_URL = "http://image.tmdb.org/t/p/w185";
const BACKDROP_BASE_URL = "http://image.tmdb.org/t/p/w780";
const CONTAINER = document.querySelector(".container");


// Don't touch this function please
const autorun = async () => {
  const movies = await fetchMovies();
  renderMovies(movies.results);
};

// Don't touch this function please
const constructUrl = (path) => {
  return `${TMDB_BASE_URL}/${path}?api_key=6de312bb1131d8c5991b62ffbdfc1830`;
};

// You may need to add to this function, definitely don't delete it.
const movieDetails = async (movie) => {
  const movieRes = await fetchMovie(movie.id);
  const videosRes = await videos(movie.id);
  const similarRes = await similarMoveies(movie.id)
  const castRes = await cast(movie.id)
  renderMovie(movieRes,videosRes,similarRes,castRes);
};

// This function is to fetch movies. You may need to add it or change some part in it in order to apply some of the features.
const fetchMovies = async () => {
  const url = constructUrl(`trending/movie/week`);
  const res = await fetch(url);
  return res.json();
};

// Don't touch this function please. This function is to fetch one movie.
const fetchMovie = async (movieId) => {
  const url = constructUrl(`movie/${movieId}`);
  const res = await fetch(url);
  return res.json();
};

// You'll need to play with this function in order to add features and enhance the style.
const renderMovies = (movies) => {
  const rowDiv = document.createElement("div");
  rowDiv.classList.add("row");

  movies.forEach((movie) => {
    const colDiv = document.createElement("div");
    colDiv.classList.add("col-md-4");

    const movieDiv = document.createElement("div");
    movieDiv.classList.add("card");
    movieDiv.innerHTML = `
      <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${movie.title} poster" class="card-img-top">
      <div class="card-body">
        <h3 class="card-title">${movie.title}</h3>
        <p class="card-rating">${movie.vote_average}</p>
      </div>
    `;

    movieDiv.addEventListener("click", () => {
      movieDetails(movie);
    });

    // Add a hover effect and cursor pointer to indicate the card is clickable
    movieDiv.classList.add("clickable-card");
    movieDiv.setAttribute("data-movie-overview", movie.overview); // Set the movie overview as an attribute

    colDiv.appendChild(movieDiv);
    rowDiv.appendChild(colDiv);
  });

  CONTAINER.innerHTML = "";
  CONTAINER.appendChild(rowDiv);
};

// function renderMovies(movies){
//   CONTAINER.innerHTML = ""
//   movies.map((movie) => {
//     if(movie.backdrop_path !== null){
//       const movieDiv = document.createElement("div");
//       movieDiv.innerHTML = ""
//       if (movie.media_type === "movie"){
//         movieDiv.innerHTML = `
//         <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${movie.title
//           } poster">
//         <h3>${movie.title}</h3>`;
//       } else if (movie.media_type === "tv"){
//         movieDiv.innerHTML = `
//         <img src="${BACKDROP_BASE_URL + movie.backdrop_path}" alt="${movie.title
//           } poster">
//         <h3>${movie.name}</h3>`;
//       }


//       movieDiv.addEventListener("click", () => {
//         movieDetails(movie);
//       });
//       CONTAINER.appendChild(movieDiv);
//     }
//   });
// }

//fetch movie's cast:
const cast = async (movie) => {
  const url = constructUrl(`movie/${movie}/credits`)
  const res = await fetch(url)
  return res.json()
}

//fetch triler videos :
const videos = async (movie) => {
const url = constructUrl(`movie/${movie}/videos`)
const res = await fetch(url)
return res.json();
}

// fetch similar movies : 

const similarMoveies = async (movie) => {
  const url = constructUrl(`movie/${movie}/similar`)
  const res =  await fetch(url)
  return res.json()
}



// You'll need to play with this function in order to add features and enhance the style.
const renderMovie = (movie, video, similar,cast) => {

  const res = async ()=> {
    
  }
  CONTAINER.innerHTML = `
    
        <div class="row justify-content-center mb-3 mb-md-4">
             <img id="movie-backdrop" class= "rounded" src=${BACKDROP_BASE_URL + movie.backdrop_path}>
        </div>
    <div class="row px-4 px-lg-0">    
      <div class="col-12 col-md-6">
            <h2 id="movie-title">${movie.title}</h2>
            <p id="movie-release-date"><b>Release Date:</b> ${movie.release_date}</p>
            <p ><b>Genres: </b> ${movie.genres.map(genre => ` ${genre.name} `)}</p>
            <p><b>Rating:</b> ${(movie.vote_average *10).toFixed(0)}% of ${movie.vote_count} users like this movie</p>
            <p ><b>Languages: </b> ${movie.spoken_languages.map((languge) => `${languge.english_name}`) }</p>
            <h3>Overview:</h3>
            <p id="movie-overview">${movie.overview}</p>
            <p><b>Director: </b> ${cast.crew.find(crew => crew.job === 'Director').name} </p>
        </div>
        <div class="col-12 col-md-6">
        <h4> TRILER </h4>
          <iframe width = 100% height = 100% class = "rounded" src="//www.youtube.com/embed/${video.results[0].key}" frameborder="0" allowfullscreen></iframe>
      </div>
        <div class= "row px-4 mt-5 px-lg-0">
        <div class= "col-12">
        <h3>Actors:</h3>
        <div id= "actorsInMovei"class = " flex-colmun d-lg-flex" ></div> 
        </div>
        <div class= "col-12 ">
        <h3>Similar Movies:</h3>
        <div id= "similerMoveies" class = " flex-colmun d-lg-flex"></div> 
        </div>
        <div class= "col-12">
        <h3>Production Companies:</h3> 
        <div id='companies' class='row mb-2 justify-content-around my-5'></div>
        </div>
        </div> 
    `;
  // const Director = cast.crew.find(crew => crew.job === 'Director').name
  const companies = movie.production_companies
  const companyDiv = document.querySelector('#companies')
companies.slice(0,2).forEach(company => {
  if(company.logo_path != null){
    const copmCard = document.createElement('div')
    copmCard.classList.add('d-flex')
    copmCard.classList.add('flex-column')
    copmCard.classList.add('justify-content-center')
    copmCard.classList.add('col-4')
    copmCard.innerHTML = `
  <img id="movie-backdrop" class= "rounded" src=${PROFILE_BASE_URL + company.logo_path} > `
   companyDiv.appendChild(copmCard)
  }
})
  const similarDiv = document.querySelector("#similerMoveies")
const similarMoveies = similar.results.slice(0,5)
similarMoveies.forEach(movie => {
  if (movie.poster_path !== null){
   const movieDiv = document.createElement("div")
   movieDiv.classList.add('col-12')
   movieDiv.classList.add('col-md-6')
   movieDiv.classList.add('col-lg-3')
    movieDiv.innerHTML = `
      <img src="${BACKDROP_BASE_URL + movie.poster_path}" alt="${movie.title} poster" class="card-img-top rounded" height="350px">
      <div class="card-body">
        <h3 class="card-title text-center">${movie.title}</h3>
      </div>`
      movieDiv.addEventListener('click',()=>{
        movieDetails(movie)
      })
      similarDiv.appendChild(movieDiv)
  }
})
  const actorsDiv = document.querySelector('#actorsInMovei')
  const actorsInMovei = cast.cast.slice(0,5)
  actorsInMovei.forEach(actor => {
    const actorDiv = document.createElement("div")
    actorDiv.classList.add('col-12')
    actorDiv.classList.add('col-md-6')
    actorDiv.classList.add('col-lg-3')
    if (actor.profile_path !== null){
      actorDiv.innerHTML = `
      <img src="${PROFILE_BASE_URL + actor.profile_path}" alt="${actor.original_name} poster" class=" rounded" >
      <div class="card-body">
        <h3 class=" text-start">${actor.original_name}</h3>
        <h5 class=" text-start"> ${actor.character}</h5>
      </div>`
      actorDiv.addEventListener('click', () => {
        actorDetails(actor)
      })
      actorsDiv.appendChild(actorDiv)
    }
    
  })
};


//search function :
const search = document.querySelector("#search")
search.onkeyup = (e)=>{
  searchInput(e.target.value)
}

function searchInput(value) {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=6de312bb1131d8c5991b62ffbdfc1830&language=en-US&query=${value}&page=1&include_adult=false`)
    .then(response => response.json())
    //  .then(data => console.log(data))
    .then(data => renderMovies(data.results))
    .catch(err => console.error(err));
}


// codes by Izdihar dropdown part; filter and genre
const filterDropdown = document.getElementById('filter'); 
const filterButton = document.getElementById('filter-btn')

filterButton.addEventListener('click', () => {
  filterDropdown.style.display = 'block';
});

filterDropdown.addEventListener('mouseleave', () => {
  filterDropdown.style.display = 'none';
});

const genreul = document.getElementById('genre');  //genre ul
const genreDropdown = document.getElementById('genre-dropdown') //genre dropdown 

genreDropdown.addEventListener('click', () => {
  genreul.style.display = 'block'; 
});

genreul.addEventListener('mouseleave', () => {
  genreul.style.display = 'none';
});

//fetching genre here !!!
const genreUl = document.querySelector("#genre")
function getGenere() {
  const url = constructUrl('genre/movie/list')
  fetch(url)
    .then(res => res.json())
    .then(data => createGenreItme(data.genres))
}
function createGenreItme(itme){
     itme.forEach(el => {
      const genreItme = document.createElement('li')
      genreItme.textContent = el.name
      genreItme.classList.add('genre')
      genreUl.appendChild(genreItme)

    genreItme.addEventListener("click", () => {
      const url = constructUrl('discover/movie') + `&with_genres=${el.id}`
      fetch(url)
        .then(resp => resp.json())
        .then(data => renderMovies(data.results))
    })

  })
}
getGenere()


const filter = document.querySelectorAll('.filter'); // Error: filter is a NodeList, not an array
// console.log(filter);
filter.forEach(element => { // Error: filter.forEach is not a function
  element.addEventListener('click', () => {
   
    if (element.textContent === 'Now playing') {
      fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=6de312bb1131d8c5991b62ffbdfc1830')
      .then(response => response.json())
      .then(json => renderMovies(json.results))
   } 
   else if (element.textContent === 'Up coming'){
    fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=6de312bb1131d8c5991b62ffbdfc1830')
    .then(response => response.json())
    .then(json => renderMovies(json.results))
   } 
   else if (element.textContent === 'Popular'){
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=6de312bb1131d8c5991b62ffbdfc1830')
    .then(response => response.json())
    .then(json => renderMovies(json.results))
   } 
   else if (element.textContent === 'Top rated') {
    fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=6de312bb1131d8c5991b62ffbdfc1830')
    .then(response => response.json())
    .then(json => renderMovies(json.results))
   }
  })
})


//navbar home: when I click on the home, the main page displays//not working yet!

const home = document.querySelector('#home')
home.addEventListener('click', async () => {
  // call the function that fetches movies from an API
  const movies = await fetchMovies();

  // Call the renderMovies function with the retrieved movies
  renderMovies(movies.results);
});


//actors dropdown

const actorsPage = document.querySelector('.actors-page')
actorsPage.addEventListener('click', () => {
  //takes you to the actors page
})

//about page
const aboutPage = document.querySelector('.about-page')
aboutPage.addEventListener('click', () => {
  //takes you to the about page
})

document.addEventListener("DOMContentLoaded", autorun);
