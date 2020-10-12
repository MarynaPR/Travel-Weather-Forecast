// preudocode 

//GIVEN a weather dashboard with form inputs WHEN I search for a city THEN I am presented with current and future conditions for that city and that city is added to the search history
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
//function-create a list of cities and storing the input
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
            //to display current day
            var today = moment().format('dddd, MMMM Do YYYY');
            var display = document.getElementById("currentDay");
            display.innerHTML = today;
            console.log("time");
            //interval that runs every min to refresh the time
            setInterval(() => {
                console.log("time update");
                var today = moment().format('dddd, MMMM Do YYYY');
            }, 10000);

            //var todayIs = moment().format("MMM Do YY");
            // console.log(todayIs);
            var locValue = data["name"];
            var descValue = data["weather"][0]["description"];
            var tempValue = data["main"]["temp"];
            var humValue = data["main"]["humidity"];
            var windValue = data["wind"]["speed"];
            var imgValue = data["weather"][0]["icon"];

            loc.innerHTML = 'Location: ' + locValue;
            desc.innerHTML = 'Weather: ' + descValue;
            temp.innerHTML = 'Temperature: ' + tempValue + 'F';
            hum.innerHTML = 'Humidity: ' + humValue + '%';
            wind.innerHTML = 'Wind Speed: ' + windValue + 'MHP';
            img.setAttribute('src', 'http://openweathermap.org/img/wn/' + imgValue + '@2x.png');
            getUv(data.coord.lon, data.coord.lat);
        })
        .catch(function (error) {
            console.log(error);
        })
    getForecast(city);


}
//WHEN I view future weather conditions for that city THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
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
            //var today = moment();
            // var date = new Date();
            // date.setDate(date.getDate() + 5);
            // var tomorrow = moment(today).add(1, "date");

            // for loop to display 5 days
            for (var i = 0; i <= 4; i++) {
                //if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {

                // var for weather conditions displayed in the bootstrap card
                //for (var i = 0; i < forecast.length; i += 8) {
                // console.log(date.list[i].dt_txt);
                var date = document.createElement("h6");
                var body = document.createElement("div");
                var cont = document.createElement("div");
                var card = document.createElement("div");
                var wind = document.createElement("p");
                var temp = document.createElement("p");
                var hum = document.createElement("p");
                var img = document.createElement("img");

                // add class
                date.classList.add("card-text");
                body.classList.add("card-body", "p-2");
                cont.classList.add("col-md-2");
                card.classList.add("card,text-white");
                wind.classList.add("card-text");
                temp.classList.add("card-text");
                hum.classList.add("card-text");
                img.classList.add("card-text");

                //display
                // date.textContent = "Date: " + data.list[i].dt_txt;
                date.textContent = new Date(data.list[i].dt_txt);
                wind.textContent = "Wind: " + data.list[i].wind.speed + "MPH";
                temp.textContent = "Temperature: " + data.list[i].main.temp + "F";
                hum.textContent = "Humidity: " + data.list[i].main.humidity + "%";
                img.setAttribute('src', 'http://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '@2x.png');

                //connect by appending
                cont.appendChild(card);
                forecast.appendChild(cont);
                body.appendChild(date);
                body.appendChild(wind);
                body.appendChild(temp);
                body.appendChild(hum);
                body.appendChild(img);
                card.appendChild(body);

            }

        });
}
//WHEN I view the UV index THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

var getUv = function (lat, lon) {
    //fetch request 
    fetch(
        "http://api.openweathermap.org/data/2.5/uvi?appid=b76c30386bab576d023d70f50d7d35cb&lat=" + lat + "&lon=" + lon)

        //convert the response to json
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            //console.log(data);
            var body = document.querySelector(".card-body");
            // uv.innerHTML = "UV Index: "// + lonValue + latValue;
            var uv = document.createElement("p");
            uv.textContent = "UV Index: " //+ data.list[i].coord.lon;
            var button = document.createElement("span");
            button.classList.add("btn");
            button.innerHTML = data.value;

            // WHEN I view the UV index THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
            //    {
            //     "lat": 38.75,
            //     "lon": 40.25,
            //     "date_iso": "2017-06-23T12:00:00Z",
            //     "date": 1498219200,
            //     "value": 10.16
            //   }
            //bootstrap buttons
            if (data.value < 2) {//favorable
                button.classList.add("btn-success");
            }
            else if (data.value < 7) {
                button.classList.add("btn-warning");
            }
            else {
                button.classList.add("btn-danger");
            }//  "btn btn-dark"
            // var lonValue = data["coord"]["lon"];
            // var latValue = data["coord"]["lat"];
            // var lonValue = data["coord"]["lon"];
            // var latValue = data["coord"]["lat"];
            // var body = document.createElement("div");
            // body.classList.add("card-body", "p-2");
            // uv.innerHTML = lonValue + latValue;
            body.appendChild(uv);
            uv.appendChild(button);
        })
}
//eventListener on click for city search
document.querySelector("#searchBtn").addEventListener("click", searchTravelCity);