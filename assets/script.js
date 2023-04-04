var cityListEl = document.querySelector("#city-list");
var cityFormEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city-input");
var cityContainerEl = document.querySelector("#city-container")
var theCity = document.querySelector("#city-name")
var temp = document.querySelector("#temp")
var wind = document.querySelector("#wind")
var humidity = document.querySelector("#humidity")
var apiKey = '636fa7103c23a27dc3dbfcfae373ccaf'
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

function cityFormHandler() {
    var cityName = cityInputEl.value.trim();
    getCity(cityName)
}

var getCity = function(city) {
    var url = 'https://api.openweathermap.org/data/2.5/weather?q='+ city + '&appid=' + apiKey

    fetch(url) 
        .then(function(response) {
            if (response.ok) {
                console.log(reponse);
                response.json().then(function(data) {
                    console.log(data)
                })
            }
        })
    
}

//  function displayWeather(cityName, searchedCity) {
//     if(cityName === 0) {
//         return;
//     }
//     theCity.textContent = searchedCity;

//  }

cityFormEl.addEventListener("submit", function (event) {
    event.preventDefault();
    var cityText = cityInputEl.value.trim();
    if (cityText === "") {
        return;
    };
    cities.push(cityText);
    cityInputEl.value = "";
    storeCity();
    renderCity();
    cityFormHandler();
});

init();
