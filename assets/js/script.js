var SearchForCityEl = document.querySelector("#search-city");
var cityInputEl = document.querySelector("#city");
var currentWeatherContainerEl = document.querySelector("#current-info");
var currentSearch = document.querySelector("#current-city");
var fiveDayEl = document.querySelector("#five-day");


var formSubmitHandler = function(event) {
   event.preventDefault();

   // get value from input element
   var city = cityInputEl.value.trim();

   if(city) {
      getWeatherInfo(city);
      fiveDay(city);
      cityInputEl.value = "";
      
   } else {
      alert("Please enter a valid city name.")
   }
}

var getWeatherInfo = function(city) {
   //api info
   var apiKey = "1e33c1c2b12a02ddb63a5e8d8a87248e"
   var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

   

   fetch(apiURL)
   .then(function(response) {
      response.json().then(function(data) {
         currentWeather(data, city);
         console.log(data);
      });
   });
};

var uvi = function(lat,lon) {
   var apiKey = "1e33c1c2b12a02ddb63a5e8d8a87248e"
   var apiURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`

   fetch(apiURL)
   .then(function(response) {
      response.json().then(function(data) {
         displayUvi(data)
         console.log(data)
      });
   });
   console.log(lat);
   console.log(lon);
}

var fiveDay = function(city) {
   var apiKey = "1e33c1c2b12a02ddb63a5e8d8a87248e"
   var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

   fetch(apiURL)
   .then(function(response) {
      response.json().then(function(data) {
         displayFiveDay(data);
         console.log(data);
      });
   });
};

var currentWeather = function(weather, citySearch) {
   
   // clear old content
   currentWeatherContainerEl.textContent = "";
   currentSearch.textContent = citySearch;

   // div to hold temperature info
   var tempEl = document.createElement("div");
   tempEl.textContent = "Temperature: " + weather.main.temp + "degrees F";
   currentWeatherContainerEl.appendChild(tempEl);

   // div to hold wind info
   var windEl = document.createElement("div");
   windEl.textContent = "Wind: " + weather.wind.speed + " MPH";
   currentWeatherContainerEl.appendChild(windEl);
   
   // div to hold humidity info
   var humidityEl = document.createElement("div");
   humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
   currentWeatherContainerEl.appendChild(humidityEl);

   var lat = weather.coord.lat;
   var lon = weather.coord.lon;
   uvi(lat,lon);

}

var displayUvi = function(index) {
   var uviEl = document.createElement("div");
   uviEl.textContent = "UV Index: " + index.value;
   currentWeatherContainerEl.appendChild(uviEl);
}

var displayFiveDay = function(weather) {
   var eachDay = weather.list;
   console.log(eachDay);

   for(var i = 7; i < eachDay.length; i = i + 8) {
      var dailyForecast = eachDay[i];
      console.log(dailyForecast);

      var futureEl = document.createElement("div");
      futureEl.classList = "card";

      var futureTempEl = document.createElement("span");
      futureTempEl.classList = "card-body";
      futureTempEl.textContent = dailyForecast.main.temp + " degrees F";
      fiveDayEl.appendChild(futureTempEl);

      var futureWindEl = document.createElement("span");
      futureWindEl.childList = "card-body";
      futureWindEl.textContent = dailyForecast.wind.speed + " MPH";
      fiveDayEl.appendChild(futureWindEl);

      var futureHumidityEl = document.createElement("span");
      futureHumidityEl.classList = "card-body";
      futureHumidityEl.textContent = dailyForecast.main.humidity + " %";
      fiveDayEl.appendChild(futureHumidityEl);

   }

   
}

SearchForCityEl.addEventListener("submit", formSubmitHandler);