var cityListEl = document.querySelector("#city-list");
var cityFormEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city-input");
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
 })
