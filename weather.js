// preudocode 
//1.fuction for get user inout for the city
//2/f for creating a list of cities and storing the input
//3 .f for weather for today and conditions
//4 f for forecast display

var userInput = document.querySelector("#form-group");

var searchTravelCity = function () {
    //event.preventDerault();
    console.log("city");
    var searchCity = document.querySelector("#searchCity").value;
    // to make sure user writes a city
    if (searchCity) {
    } else {
        alert("Please select a city!");
    }
}
//userInput.reset();
document.querySelector("#searchBtn").addEventListener("click", searchTravelCity);

