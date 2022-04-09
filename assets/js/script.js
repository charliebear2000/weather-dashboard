var SearchForCityEl = document.querySelector("#search-city");
var cityInputEl = document.querySelector("#city");


var formSubmitHandler = function(event) {
   event.preventDefault();

   // get value from input element
   var city = cityInputEl.value.trim();

   if(city) {
      getWeatherInfo(city);
      
   } else {
      alert("Please enter a valid city name.")
   }
}

var getWeatherInfo = function(city) {
   //api info
   var apiKey = "1e33c1c2b12a02ddb63a5e8d8a87248e"
   var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

   

   fetch(apiURL)
   .then(function(response) {
      response.json().then(function(data) {
         console.log(data)
      });
   });
};


SearchForCityEl.addEventListener("submit", formSubmitHandler);