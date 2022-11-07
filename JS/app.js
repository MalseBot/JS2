var mynav = document.getElementById("mynav");
var Mname =document.getElementById("Mname");
var Mdesc =document.getElementById("Mdesc");
var movies;



if (localStorage.getItem("movies") == null) {
    movies = []
}
else{
    movies = JSON.parse(localStorage.getItem("movies"))
}


displaymovies(movies);

function insert() {
    var movie = 
            {
                movieName : Mname.value,
                movieDesc : Mdesc.value
            }

            movies.push(movie)
            localStorage.setItem("movies",JSON.stringify(movies));
             displaymovies(movies);
            clear();
}

function clear()
{
    Mname.value = "";
    Mdesc.value = "";

}

function displaymovies(arrayOfObject)
{
    var storage="";
    for (let index = 0; index < arrayOfObject.length; index++) {
           storage += `<tr>
           <td>${index}</td>
           <td>${arrayOfObject[index].movieName}</td>
           <td>${arrayOfObject[index].movieDesc}</td>
           <td><button type="button" onclick="deletemovie(${index});" class="btn btn-danger">Delete</button></td>`;
    }

    document.getElementById("result").innerHTML = storage;
}

window.onscroll = function () {
    "use strict";
    if (window.pageYOffset > 900) {
        mynav.classList.add("bg-opacity-25");
    }
    else{
        mynav.classList.remove("bg-opacity-25");
    }
}

function deletemovie(index)
{
    movies.splice(index,1);
    localStorage.setItem("movies",JSON.stringify(movies));
    displaymovies(movies);
}

function welcome() {
    var visiter = document.getElementById("visiterName")
    document.getElementById("VNdisplay").innerHTML =visiter.value;
    alert("Hope you have fun in our site")
}

const API_KEY = 'api_key=a6be3551036c2d575ac8c9c07fc2d683'
const BASE_URL = 'https://api.themoviedb.org/3/'
const API_URL = BASE_URL + 'discover/movie?' + API_KEY + '&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate'
const IMG_URL = 'https://image.tmdb.org/t/p/w500'
const main = document.getElementById('mostPopular');
const form = document.getElementById('form');
const search = document.getElementById('search');
const searchURL = BASE_URL + '/search/movie?' +API_KEY;

getMovies(API_URL);


function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showMovies(data.results);
    })
}

function showMovies(data) {
    main.innerHTML='';



    data.forEach(movie => {

        const {title, poster_path, overview} = movie;
        const movieEl =document.createElement('div');
    movieEl.classList.add('movie');
movieEl.innerHTML = `<div class="col">
<div class="card">
  <img src="${IMG_URL +poster_path}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${title}</h5>
    <p class="card-text">${overview}</p>
  </div>
</div>
</div>`
main.appendChild(movieEl);
}
)}
              
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(searchURL+'&query='+searchTerm)
    }else{
        getMovies(API_URL);
    }
})
        

