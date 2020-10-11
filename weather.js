// preudocode 

//1.fuction for get user input for the city
var searchTravelCity = function (event) {
    event.preventDefault();
    //console.log("city");
    var city = document.querySelector("#searchcity").value;
    // to make sure user writes a city
    if (city) {
        storeTravelCity(city);
        weatherCall(city);
    } else {
        alert("Please select a city!");
    }
    getForecast(city);
}

var list = []
//2 function-create a list of cities and storing the input
var storeTravelCity = function (city) {
    console.log("storedTravelCity");
    localStorage.setItem("list", JSON.stringify(list));
    var listOfCities = document.createElement("li");
    listOfCities.classList.add("searchCity")//("list-group-city")//, "list-group-stored");
    //create list -div to hold city info and add to list them
    // var storedCities = document.createElement("div");
    // storedCities.innerHTML = "<h3><span class='searchCity'" + searchCity + "</span>";
    var string = city;
    listOfCities.textContent = string;
    var storedCities = document.querySelector(".storedTravelCity");

    document.storedCities.onclick = function () {
        console.log(event.this);
        if (event.this == "li") {
            weatherCall(event.target.textContent);
        }
        //alert("hello")
    }
    storedCities.appendChild(listOfCities);
    document.querySelector("#searchBtn").addEventListener("click", searchTravelCity);
};

///3 .f for weather for today and conditions in the chosen city

var weatherCall = function (city) {
    console.log("weather")
    //fetch the weather with api keys
    fetch(
        "http://api.openweathermap.org/data/2.5/weather?q="
        + city
        + "&appid=b76c30386bab576d023d70f50d7d35cb&units=imperial"
    )
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (response) {
            console.log(response);
        })

    // city name
    // date, 
    //icon representation of weather conditions, 
    //current temperature, 
    //current humidity, 
    //windspeed,//
    //uv index, 
    //5 day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
}
//4 f for forecast display 5day
var getForecast = function (city) {
    console.log(city);
    //fetch request
    fetch(
        "http://api.openweathermap.org/data/2.5/forecast?q="
        + city
        + "&appid=b76c30386bab576d023d70f50d7d35cb&units=imperial"
    )
        //convert the response to JSON
        .then(function (response) {
            return response.json();
        })
        .then(function (response) {
            console.log(response);
        })
}


document.querySelector("#searchBtn").addEventListener("click", searchTravelCity);