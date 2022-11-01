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
    var cartoona="";
    for (let index = 0; index < arrayOfObject.length; index++) {
           cartoona += `<tr>
           <td>${index}</td>
           <td>${arrayOfObject[index].movieName}</td>
           <td>${arrayOfObject[index].movieDesc}</td>
           <td><button type="button" onclick="deletemovie(${index});" class="btn btn-danger">Delete</button></td>`;
    }

    document.getElementById("result").innerHTML = cartoona;
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

