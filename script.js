// Time and Date Function //
function formatTime(timestamp) {
  let time = new Date(timestamp);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let year = time.getFullYear();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[time.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[time.getMonth()];

  let greeting = document.querySelector("#greeting");
  if (hours < 12) {
    greeting.innerHTML = "Good morning";
  } else {
    if (hours > 18) {
      greeting.innerHTML = "Good evening";
    } else {
      greeting.innerHTML = "Good afternoon";
    }
  }

  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast-temperatures");

  let forecastHTML = `<div class="row">`; // adding on bits of code together

  // loop for putting in each day
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div id = "forecastDay">${formatDay(forecastDay.time)}</div>
        <div>
          <img
          src=${forecastDay.condition.icon_url}
                alt="${forecastDay.condition.description}"
                id="iconForecast"
                >
        </div>
        <span class="high-temp" id="high-temp">
          <strong>${Math.round(forecastDay.temperature.maximum)}</strong>
        </span>
        /<span class="low-temp"> ${Math.round(
          forecastDay.temperature.minimum
        )}°</span>
      </div>
    `;
    }
  });

  forecastHTML = forecastHTML + "</div>"; // closing
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates.data);
  let key = "a3co8cfc69t20f3a05200f0a3ac4b3e8";
  let units = "metric";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${key}&units=${units}`;
  console.log(apiURL);

  axios.get(apiURL).then(displayForecast);
}

// Function using the data from the API
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let locationElement = document.querySelector("#location");
  locationElement.innerHTML = response.data.city;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#todaysDate");
  dateElement.innerHTML = formatTime(response.data.time * 1000); // Sending the date to the formatTime function
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.icon);

  celsiusTemperature = response.data.temperature.current; // This is a global variable (it exists outside this function). When we click search, it fills this value in the variable.
  console.log(response.data);

  getForecast(response.data.coordinates);
}

function search(city) {
  let key = "a3co8cfc69t20f3a05200f0a3ac4b3e8";
  let units = "metric";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=${units}`;
  axios.get(url).then(displayTemperature); // API Call
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#searchInput");
  search(cityInputElement.value); // remember .value so that it gives you the city name, not the object!
}

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitValue = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitValue);
}
function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function searchLocation(position) {
  let key = "a3co8cfc69t20f3a05200f0a3ac4b3e8";
  let url = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${key}`;
  axios.get(url).then(displayTemperature); // API Call
}

function currentLocationWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let celsiusTemperature = null; // null means it has nothing in it until we search

let form = document.querySelector("#searchBar");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

let currentLocationButton = document.querySelector("#currentLocationButton");
currentLocationButton.addEventListener("click", currentLocationWeather);

search("Aberlour"); // Defaults to London on load
