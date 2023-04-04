var cityListEl = document.querySelector("#city-list");
var cityFormEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city-input");
var cityContainerEl = document.querySelector("#city-container")
var theCity = document.querySelector("#city-name")
var temp = document.querySelector("#temp")
var wing = document.querySelector("#wind")
var humidity = document.querySelector("#humidity")
var cities = [];

function renderCity() {
    cityListEl.innerHTML = "";
  
    // Renders a new li for each city
    for (var i = 0; i < cities.length; i++) {
      var city = cities[i];
  
      var li = document.createElement("li");
      li.textContent = city;
      li.setAttribute("data-index", i);
      cityListEl.appendChild(li);
    }
}

function init() {
    var storedCities = JSON.parse(localStorage.getItem("city-name"));
    if (storedCities !== null) {
        cities = storedCities
    };
    renderCity();
}

function storeCity() {
    localStorage.setItem("city-name", JSON.stringify(cities))
}

 cityFormEl.addEventListener("submit", function(event) {
    event.preventDefault();
    var cityText = cityInputEl.value.trim();
    if ( cityText === "") {
        return;
    };
    cities.push(cityText);
    cityInputEl.value = "";
    storeCity();
    renderCity();
 });

 function cityFormHandler(event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();
    if(cityName) {
        getCity(cityName);
        cityContainerEl.textContent = "";
        cityInputEl.value = "";
    }else {
        alert("Please enter a city!");
    }
 }

 function getCity(city) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=33.44&lon=-94.04&appid=636fa7103c23a27dc3dbfcfae373ccaf'

    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            console.log(response)
            response.json().then(function(data) {
                console.log(data)
                displayWeather(data, city);
            })
        }
    })
 }

 function displayWeather(cityName, searchedCity) {
    if(cityName === 0) {
        return;
    }
    theCity.textContent = searchedCity;
    temp.textContent = 
 }