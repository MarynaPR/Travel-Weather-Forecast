// preudocode 
//GIVEN a weather dashboard with form inputs WHEN I search for a city THEN I am presented with current and future conditions for that city and that city is added to the search history
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
//WHEN I view current weather conditions for that city THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
///3 weather today and conditions in the chosen city
var weatherCall = function (city) {
    console.log("weather")
    var city = document.querySelector("#searchcity").value;
    var loc = document.querySelector(".loc");
    var desc = document.querySelector(".desc");
    var temp = document.querySelector(".temp");
    var hum = document.querySelector(".hum");
    var wind = document.querySelector(".wind");
    //var uv = document.querySelector(".uv");
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
            //var lonValue = data["coord"]["lon"];
            // var latValue = data["coord"]["lat"];
            var imgValue = data["weather"][0]["icon"];

            loc.innerHTML = 'Location: ' + locValue;
            desc.innerHTML = 'Weather: ' + descValue;
            temp.innerHTML = 'Temperature: ' + tempValue + 'F';
            hum.innerHTML = 'Humidity: ' + humValue + '%';
            wind.innerHTML = 'Wind Speed: ' + windValue + 'MHP';
            //uv.innerHTML = uvValue;
            img.setAttribute('src', 'http://openweathermap.org/img/wn/' + imgValue + '@2x.png');
        })
        .catch(function (error) {
            console.log(error);

        })
    getForecast(city);
}
//WHEN I view future weather conditions for that city THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
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
            forecast.innerHTML = "<h3 class=\"mr-12\">5-Day Forecast:</h3>";

            // for loop 
            for (var i = 0; i <= 5; i++) {

                // var for weather conditions displayed in the bootstrap card

                var date = document.createElement("h6");
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
                img.classList.add("card-text");//image?

                //display
                date.textContent = "Date: " + new Date(data.list[i].dt_txt);
                wind.textContent = "Wind: " + data.list[i].wind.speed + "MPH";
                temp.textContent = "Temperature: " + data.list[i].main.temp + "F";
                hum.textContent = "Humidity: " + data.list[i].main.humidity + "%";
                img.setAttribute('src', 'http://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '@2x.png');
                //uv.textContent = "Coord: " + data.list[i].coord.lon;

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
            }
        })
}
//WHEN I view the UV index THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
document.querySelector("#searchBtn").addEventListener("click", searchTravelCity);