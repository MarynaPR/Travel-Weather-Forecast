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
        // getForecast(city);
    } else {
        alert("Please select a city!");
    }

}

//var list = []
//2 function-create a list of cities and storing the input
var storeTravelCity = function (city) {
    console.log("storedTravelCity");
    var list = [];
    localStorage.setItem("list", JSON.stringify(list));
    var listOfCities = document.createElement("li");
    listOfCities.classList.add("searchCity")
    var string = city;
    listOfCities.textContent = string;
    var storedCities = document.querySelector(".storedTravelCity");
    //list the cities onclick function
    storedCities.onclick = function () {
        console.log(event.this);
        if (event.this == "li") {
            weatherCall(event.target.textContent);
            getForecast(event.target.textContent);
        }
    }
    storedCities.appendChild(listOfCities);
    // getForecast(city);
    //document.querySelector("#searchBtn").addEventListener("click", searchTravelCity);
};

///3 weather today and conditions in the chosen city
var weatherCall = function (city) {
    console.log("weather")
    var city = document.querySelector("#searchcity").value;
    var loc = document.querySelector(".loc");
    var desc = document.querySelector(".desc");
    var temp = document.querySelector(".temp");
    var hum = document.querySelector(".hum");
    var wind = document.querySelector(".wind");
    var uv = document.querySelector(".uv");
    var img = document.querySelector(".img");
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
        .then(function (data) {
            console.log(data);
            // var button = document.querySelector(".searchBtn");

            var locValue = data["name"];
            var descValue = data["weather"][0]["description"];
            var tempValue = data["main"]["temp"];
            var humValue = data["main"]["humidity"];
            var windValue = data["wind"]["speed"];
            var uvValue = data["coord"]["lon"]["lat"];
            var imgValue = data["weather"][0]["icon"];

            loc.innerHTML = locValue;
            desc.innerHTML = descValue;
            temp.innerHTML = tempValue;
            hum.innerHTML = humValue;
            wind.innerHTML = windValue;
            uv.innerHTML = uvValue;
            img.innerHTML = imgValue;
        })
        .catch(function (error) {
            console.log(error);

        })
    getForecast(city);
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
        .then(function (data) {
            console.log(data);

            var forecast = document.querySelector("#fivedaycontainer");
            forecastContainer = document.createElement("div");
            forecastContainer.className = "\'row\'";
            forecast.innerHTML = "<h3 class=\"mt-3\">5-Day Forecast:</h3>";

            // var for weather conditions displayed in the bootstrap card

            var date = document.createElement("h3");
            var body = document.createElement("div");
            var cont = document.createElement("div");
            var card = document.createElement("div");
            var wind = document.createElement("p");
            var temp = document.createElement("p");
            var hum = document.createElement("p");
            var uv = document.createElement("p");
            var img = document.createElement("img");

            // add class
            date.classList.add("card-text");
            body.classList.add("card-body", "p-2");
            cont.classList.add("col-md-2");
            card.classList.add("card,text-white");
            wind.classList.add("card-text");
            temp.classList.add("card-text");
            hum.classList.add("card-text");
            uv.classList.add("card-text");
            img.classList.add("card-tex");//image?

            //display
            wind.textContent = "Wind: " + data.list[i].wind.speed + "MPH";

            //connect by appending
            cont.appendChild(card);
            forecast.appendChild(cont);
            body.appendChild(date);
            body.appendChild(wind);
            body.appendChild(temp);
            body.appendChild(hum);
            body.appendChild(uv);
            body.appendChild(img);
            card.appendChild(body);

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
document.querySelector("#searchBtn").addEventListener("click", searchTravelCity);