// preudocode 

//1.fuction for get user inout for the city
var searchTravelCity = function () {
    //event.preventDerault();
    console.log("city");
    var searchCity = document.querySelector("#searchCity").value;
    //storeTravelCity(searchCity);
    // to make sure user writes a city
    if (searchCity) {
        storeTravelCity(searchCity);
    } else {
        alert("Please select a city!");
    }
    // var citySearchObj = {
    //     name: searchCity,
    // };
}
//2 function-create a list of cities and storing the input
var storeTravelCity = function (searchCity) {
    console.log("storedCities");
    var listOfCities = document.createElement("li");
    listOfCities.classList.add("searchCity")//("list-group-city")//, "list-group-stored");
    //create list -div to hold city info and add to list them
    // var storedCities = document.createElement("div");
    // storedCities.innerHTML = "<h3><span class='searchCity'" + searchCity + "</span>";
    var string = searchCity;
    listOfCities.textContent = string;
    var storedCities = document.querySelector(".storedTravelCity");

    storedCities.onclick = function () {
        console.log(event.this.city);
        if (event.this.city == "li") {
        }
        alert("hello")

    }
    storedCities.appendChild(listOfCities);
};

document.querySelector("#searchBtn").addEventListener("click", searchTravelCity);
///3 .f for weather for today and conditions in the chosen city

var weatherCall = function (searchCity) {
    console.log("weather")
    //fetch the weather with api keys
    fetch(
        "http://api.openweathermap.org/data/2.5/weather?q="
        + searchCity
        + "&appid=b76c30386bab576d023d70f50d7d35cb"
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // })
            // .catch.function()
            // Use 'querySelector' to get the ID of where the GIF will be displayed
            var responseContainer


        }

//4 f for forecast display
