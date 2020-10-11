//Define Dates & Times
function formatDate(timestamp) {
  let now = new Date(timestamp);

  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  let date = now.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  return `${day} ${date} ${month} ${year}`;
}
function formatHours(timestamp) {
  let time = new Date(timestamp);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
//Fetching current temperatures and location

function showTemp(response) {
  currentTempCel = response.data.main.temp;

  let currentTemp = document.querySelector("#temp-now");
  currentTemp.innerHTML = Math.round(currentTempCel);

  let currentCity = document.querySelector("#main-city");
  currentCity.innerHTML = response.data.name;

  let currentCountry = document.querySelector("#main-country");
  currentCountry.innerHTML = response.data.sys.country;

  let currentDescription = document.querySelector("#main-description");
  currentDescription.innerHTML = response.data.weather[0].description;

  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;

  let currentWind = document.querySelector("#windspeed");
  currentWind.innerHTML = `Windspeed: ${Math.round(
    response.data.wind.speed
  )} Km/H`;

  let currentDate = document.querySelector("#date-now");
  currentDate.innerHTML = formatDate(response.data.dt * 1000);

  let currentTime = document.querySelector("#time-now");
  currentTime.innerHTML = formatHours(response.data.dt * 1000);

  let currentIcon = document.querySelector("#main-icon");
  currentIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = response.data.list[0];

  //1
  forecastElement.innerHTML = `
  <div class="col-2">
    <h5>
    ${formatHours(forecast.dt * 1000)}
    </h5>
    <img src="http://openweathermap.org/img/wn/${
      forecast.weather[0].icon
    }@2x.png" alt=""/>
    <div class="weather-forecast-temp">
      ${Math.round(forecast.main.temp)}°C
    </div>
  </div>`;
  //2
  forecast = response.data.list[1];
  forecastElement.innerHTML += `
  <div class="col-2">
    <h5>
    ${formatHours(forecast.dt * 1000)}
    </h5>
    <img src="http://openweathermap.org/img/wn/${
      forecast.weather[0].icon
    }@2x.png" alt=""/>
    <div class="weather-forecast-temp">
      ${Math.round(forecast.main.temp)}°C
    </div>
  </div>`;
  //3
  forecast = response.data.list[2];
  forecastElement.innerHTML += `
  <div class="col-2">
    <h5>
    ${formatHours(forecast.dt * 1000)}
    </h5>
    <img src="http://openweathermap.org/img/wn/${
      forecast.weather[0].icon
    }@2x.png" alt=""/>
    <div class="weather-forecast-temp">
      ${Math.round(forecast.main.temp)}°C
    </div>
  </div>`;

  //4
  forecast = response.data.list[3];
  forecastElement.innerHTML += `
  <div class="col-2">
    <h5>
    ${formatHours(forecast.dt * 1000)}
    </h5>
    <img src="http://openweathermap.org/img/wn/${
      forecast.weather[0].icon
    }@2x.png" alt=""/>
    <div class="weather-forecast-temp">
      ${Math.round(forecast.main.temp)}°C
    </div>
  </div>`;
  //5
  forecast = response.data.list[4];
  forecastElement.innerHTML += `
  <div class="col-2">
    <h5>
    ${formatHours(forecast.dt * 1000)}
    </h5>
    <img src="http://openweathermap.org/img/wn/${
      forecast.weather[0].icon
    }@2x.png" alt=""/>
    <div class="weather-forecast-temp">
      ${Math.round(forecast.main.temp)}°C
    </div>
  </div>`;
}

function search(city) {
  let apiKey = "d7ef075e23ceff7dd7b77b4367b2add8";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
  let apiUrl2 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl2).then(showForecast);
}

function searchSubmit(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#search-input");
  search(citySearch.value);
}

//current position
function showPosition(position) {
  let lati = position.coords.latitude;
  let long = position.coords.longitude;

  let units = "metric";
  let apiKey = "d7ef075e23ceff7dd7b77b4367b2add8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lati}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showForecast);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("main-description");
  forecastElement.innerHTML = currentDescription;
}

function showImperial(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-now");
  let currentTempFar = (currentTempCel * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(currentTempFar);
}

function showMetric(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-now");
  temperatureElement.innerHTML = Math.round(currentTempCel);
}

let currentTempCel = null;

//search engine
search("London");
let form = document.querySelector(".search");
form.addEventListener("submit", searchSubmit);

//unit conversion from metric to imperial
fahrenheitElement = document.querySelector("#fahrenheit");
fahrenheitElement.addEventListener("click", showImperial);

celciusElement = document.querySelector("#celcius");
celciusElement.addEventListener("click", showMetric);

//currentLocation

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
