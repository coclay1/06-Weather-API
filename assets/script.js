var cityListEl = document.querySelector("#city-list");
var cityFormEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city-input");
var cityContainerEl = document.querySelector("#city-container")
var theCity = document.querySelector("#city-name")
var temp = document.querySelector("#temp")
var wind = document.querySelector("#wind")
var humidity = document.querySelector("#humidity")
var forecastEl = document.querySelector('#forecast')
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

function getCity() {
    var cityName = cityInputEl.value.trim();
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=imperial&appid=' + apiKey

    fetch(url)
        .then(function (response) {
            if (response.ok) {
                console.log(response);
                response.json().then(function (data) {
                    console.log(data);
                    displayWeather(data);
                })
            }
        })
}

function forecast() {
    var cityName = cityInputEl.value.trim();
    var forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+ cityName + '&units=imperial&cnt=5&appid=' + apiKey
    fetch(forecastUrl)
    .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                displayForecast(data)
            })
        }
    })
}

function displayWeather(weather) {
    theCity.textContent = weather.name + dayjs().format(' M/D/YYYY')
    temp.textContent = "Temp: " + weather.main.temp + ' F'
    humidity.textContent = "Humidity: " + weather.main.humidity + '%'
    wind.textContent = "Wind: " + weather.wind.speed + 'mph'
}

function displayForecast(forecast) {
    for (var i = 0; i < forecast.list.length; i++) {
        var forecastDiv = document.createElement('div')
        var forecastDay = document.createElement('p')
        var forecastTemp = document.createElement('p')
        var forecastHumidity = document.createElement('p')
        var forecastWind = document.createElement('p')
        forecastDay.textContent = dayjs().format('M/D/YYYY')
        forecastTemp.textContent = forecast.list[i].main.temp + ' F'
        forecastHumidity.textContent = forecast.list[i].main.humidity + '%'
        forecastWind.textContent = forecast.list[i].wind.speed + 'mph'
        forecastDiv.append(forecastDay)
        forecastDiv.append(forecastTemp)
        forecastDiv.append(forecastHumidity)
        forecastDiv.append(forecastWind)
        forecastDiv.setAttribute('data-day', i)
        forecastDiv.setAttribute('class', 'forecast-1 col-2 justify-space-between')
        forecastEl.append(forecastDiv)
    }
}

cityFormEl.addEventListener("submit", function (event) {
    event.preventDefault();
    var cityText = cityInputEl.value.trim();
    if (cityText === "") {
        return;
    };
    cities.push(cityText);
    getCity();
    forecast()
    cityInputEl.value = "";
    storeCity();
    renderCity();
});

init();
