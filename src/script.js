let now = new Date();
let currentDate = document.querySelector("#current-date");
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];

let date = now.getDate();
let year = now.getFullYear();

let hour = now.getHours();
let min = now.getMinutes();

currentDate.innerHTML = `${day}, ${date}, ${year} <br /> ${hour}:${min}`;

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}: ${min}`;
}

//api calls
function displayTemperature(response) {
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  //icon main update and source link
  let iconElement = document.querySelector("#icon-main");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png `
  );
  //icons data
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
//forecast
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
        <div class="row-sm-8">
          <h4>
            ${formatHours(forecast.dt * 1000)}
          </h4>
          <img src="http://openweathermap.org/img/wn/${
            forecast.weather[0].icon
          }@2x.png"style="margin:1px 18px 0;height:48px;width:48px"/>
          <div class="weather- forecast-temp"><strong>${Math.round(
            forecast.main.temp_max
          )}°</strong> | ${Math.round(forecast.main.temp_min)}°
          </div>
        </div>`;
  }
}

//search
function search(city) {
  let apikey = "7617dbfebdf449723a30b5c2d2231c02";
  let api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
  axios.get(api).then(displayTemperature);

  api = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`;
  axios.get(api).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Miami");
