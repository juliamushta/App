let now = new Date();
let li = document.querySelector("#currentDate");
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
li.innerHTML = `${day} ${hours}:${minutes}`;


function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#citySearch")
  let h1 = document.querySelector("#headingCity");
  h1.innerHTML = `${city.value}`;
  findCity(city.value);
}

let clickSearch = document.querySelector("#search-form");
clickSearch.addEventListener("submit", searchCity);

function showValue(response) {
  let h1 = document.querySelector("#headingCity");
  h1.innerHTML = response.data.name;
  celsiusTemp = Math.round(response.data.main.temp);
  let actualTemperature = document.querySelector("#temperatureValue");
  actualTemperature.innerHTML = `${celsiusTemp}`;
  let iconElement = document.querySelector("#icon");
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0],description);
}

function findCity(city) {
  let units = "metric";
  let apiKey = "97a52f17c0944e52db226f4e7f948b69";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showValue);
}

function findLocation(position) {
  let apiKey = "97a52f17c0944e52db226f4e7f948b69";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showValue);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentLocation);

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let tempElement = document.querySelector("#temperatureValue");
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function displayCelsius(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperatureValue");
  tempElement.innerHTML = Math.round(celsiusTemp); 
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#tempFahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#tempCelsius");
celsiusLink.addEventListener("click", displayCelsius);

findCity("Kyiv");


