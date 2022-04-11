var SearchForCityEl = document.querySelector("#search-city");
var cityInputEl = document.querySelector("#city");
var currentWeatherContainerEl = document.querySelector("#current-info");
var currentSearch = document.querySelector("#current-city");
var fiveDayEl = document.querySelector("#five-day");
var fiveDayTitle = document.querySelector("#title");
var savedSearchContainerEl = document.querySelector("#past-searches");
var savedCities = [];

// function for search
var formSubmitHandler = function(event) {
   event.preventDefault();

   // get value from input element
   var city = cityInputEl.value.trim();

   if(city) {
      getWeatherInfo(city);
      fiveDay(city);
      savedCities.push({city});
      cityInputEl.value = "";
      
   } else {
      alert("Please enter a valid city name.")
   }
   
   savedSearch();
   pastSearch(city);
}

// current weather API function
var getWeatherInfo = function(city) {
   
   var apiKey = "1e33c1c2b12a02ddb63a5e8d8a87248e"
   var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

   fetch(apiURL)
   .then(function(response) {
      response.json().then(function(data) {
         currentWeather(data, city);
         
      });
   });
};

// uv index API function
var uvi = function(lat,lon) {
   var apiKey = "1e33c1c2b12a02ddb63a5e8d8a87248e"
   var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}`

   fetch(apiURL)
   .then(function(response) {
      response.json().then(function(data) {
         displayUvi(data)
        
      });
   });
}

// 5 day forecast API function
var fiveDay = function(city) {
   var apiKey = "1e33c1c2b12a02ddb63a5e8d8a87248e"
   var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`

   fetch(apiURL)
   .then(function(response) {
      response.json().then(function(data) {
         displayFiveDay(data);
         
      });
   });
};

// send saved search to local storage
var savedSearch = function() {
   localStorage.setItem("savedCities", JSON.stringify(savedCities));
};

// push saved search to the page
var pastSearch = function(pastSearch) {
   
      var savedSearchEl = document.createElement("button");
      savedSearchEl.classList = "past";
      savedSearchEl.textContent = pastSearch;
      savedSearchEl.setAttribute("data-city", pastSearch);
      savedSearchEl.setAttribute("type", "submit");
      savedSearchContainerEl.prepend(savedSearchEl);
   
}

//
var currentWeather = function(weather, citySearch) {
   
   // clear old content
   currentWeatherContainerEl.textContent = "";
   currentSearch.textContent = citySearch;

   // add date to current forecast
   var date = document.createElement("span");
   date.textContent = " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
   currentSearch.appendChild(date);

   // add weather icon to current forecast
   var weatherIcon = document.createElement("img");
   weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`);
   currentSearch.appendChild(weatherIcon);
   
   // div to hold temperature info
   var tempEl = document.createElement("div");
   tempEl.textContent = "Temperature: " + weather.main.temp + "°F";
   tempEl.classList = "list-item";
   currentWeatherContainerEl.appendChild(tempEl);

   // div to hold wind info
   var windEl = document.createElement("div");
   windEl.textContent = "Wind: " + weather.wind.speed + " MPH";
   windEl.classList = "list-item";
   currentWeatherContainerEl.appendChild(windEl);
   
   // div to hold humidity info
   var humidityEl = document.createElement("div");
   humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
   humidityEl.classList = "list-item";
   currentWeatherContainerEl.appendChild(humidityEl);

   var lat = weather.coord.lat;
   var lon = weather.coord.lon;
   uvi(lat,lon);

}

// displays uv index in current weather
var displayUvi = function(index) {
   var uviEl = document.createElement("div");
   uviEl.textContent = "UV Index: ";
   uviEl.classList = "list-item";

   var uviValue = document.createElement("span");
   uviValue.textContent = index.value;

   if(index.value <=3) {
      uviValue.classList = "good";
   } else if(index.value > 3 && index.value <= 8) {
      uviValue.classList = "moderate";
   } else if(index.value > 8) {
      uviValue.classList = "severe";
   };

   uviEl.appendChild(uviValue);
   currentWeatherContainerEl.appendChild(uviEl);
}

// 5 day forecast function
var displayFiveDay = function(weather) {

   // clear content
   fiveDayEl.textContent="";

   fiveDayTitle.textContent = "5-Day Forecast:";

   var eachDay = weather.list;

   // grab the weather at noon each day for 5 days
   for(var i = 7; i < eachDay.length; i = i + 8) {
      var dailyForecast = eachDay[i];
      console.log(dailyForecast);

      var futureEl = document.createElement("div");
      futureEl.classList = "card m-3";

      // date is added to 5-day forecast
      var futureDate = document.createElement("h5");
      futureDate.textContent = moment.unix(dailyForecast.dt).format("MMM D, YYYY");
      futureDate.classList = "card-header";
      futureEl.appendChild(futureDate);

      // weather icon added to 5-day forecast
      var weatherIcon = document.createElement("img");
      weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}.png`);
      weatherIcon.classList = "card-body";
      futureEl.appendChild(weatherIcon);

      // temp is added to 5-day forecast
      var futureTempEl = document.createElement("span");
      futureTempEl.classList = "card-body";
      futureTempEl.textContent = "Temp: " + dailyForecast.main.temp + " °F";
      futureEl.appendChild(futureTempEl);

      // wind speed is added to 5-day forecast
      var futureWindEl = document.createElement("span");
      futureWindEl.childList = "card-body";
      futureWindEl.textContent = "Wind: " + dailyForecast.wind.speed + " MPH";
      futureEl.appendChild(futureWindEl);

      // humidity is added to 5-day forecast
      var futureHumidityEl = document.createElement("span");
      futureHumidityEl.classList = "card-body";
      futureHumidityEl.textContent = "Humidity: " + dailyForecast.main.humidity + "%";
      futureEl.appendChild(futureHumidityEl);

      fiveDayEl.appendChild(futureEl);

   }
}

// makes past searches into buttons
var pastSearchButton = function(event) {
   var city = event.target.getAttribute("data-city");
   console.log(city);
   if(city) {
      getWeatherInfo(city);
      fiveDay(city);
   }
}

SearchForCityEl.addEventListener("submit", formSubmitHandler);
savedSearchContainerEl.addEventListener("click", pastSearchButton);