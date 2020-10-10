// preudocode 
//3 .f for weather for today and conditions
//4 f for forecast display

//1.fuction for get user inout for the city
var searchTravelCity = function () {
    //event.preventDerault();
    console.log("city");
    var searchCity = document.querySelector("#searchCity").value;
    storeTravelCity(searchCity);
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
