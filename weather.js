// preudocode 

var searchCity = document.querySelector("#searchcity");
//1.fuction for get user inout for the city
var searchTravelCity = function (event) {
    event.preventDerault();
    console.log("city");
    var city = searchCity.value.trim();
    //storeTravelCity(searchCity);
    // to make sure user writes a city
    if (city) {
        storeTravelCity(searchCity);
        weatherCall(searchCity);
    } else {
        alert("Please select a city!");
    }
    // var citySearchObj = {
    //     name: searchCity,
    // };
}
var displayCity = function () {

}
var list = []
//2 function-create a list of cities and storing the input
var storeTravelCity = function (city) {
    console.log("storedCities");
    localStorage.setItem("list", JSON.stringify(list));
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
    document.querySelector("#searchBtn").addEventListener("click", searchTravelCity)
};

///3 .f for weather for today and conditions in the chosen city

var weatherCall = function (city) {
    console.log("weather")
    //var searchCity = document.querySelector("#searchCity").value;
    //fetch the weather with api keys
    fetch(
        "http://api.openweathermap.org/data/2.5/weather?q="
        + searchCity
        + "&appid=b76c30386bab576d023d70f50d7d35cb&units=imperial"
    )
        .then(function (response) {
            //console.log(response);
            return response.json();
        })
        .then(function (response) {
            console.log(response.data);

        })
}
//4 f for forecast display

document.querySelector("#searchBtn").addEventListener("submit", searchTravelCity);