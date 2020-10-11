//Define Dates & Times
let now = new Date();
function formatDate() {
  let date = now.getDate();
  if (date < 10) {
    date = `0${date}`;
  }
  let year = now.getFullYear();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];

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

  return `${day} ${date} ${month} ${year}`;
}

function formatHours() {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}
document.querySelector("h3").innerHTML = formatHours();
//search engine

function showPosition(position) {
  let lati = position.coords.latitude;
  let long = position.coords.longitude;

  let units = "metric";
  let apiKey = "d7ef075e23ceff7dd7b77b4367b2add8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${long}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemp);
}
