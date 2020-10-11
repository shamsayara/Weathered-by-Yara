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
//Fetching temperatures and location

function showTemp(response) {
  console.log(response.data);

  let currentTemp = document.querySelector("#temp-now");
  currentTemp.innerHTML = Math.round(response.data.main.temp);

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
}
let apiKey = "d7ef075e23ceff7dd7b77b4367b2add8";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(showTemp);
