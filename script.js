// Time and Date Function //
function dateTime(data) {
  let dateRT = data.getDate();
  let hours = data.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = data.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let year = data.getFullYear();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[data.getDay()];

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
  let month = months[data.getMonth()];

  let date = document.querySelector("#todaysDate");
  date.innerHTML = `${day}, ${dateRT} ${month} ${year}`;

  let time = document.querySelector("#currentTime");
  time.innerHTML = `${hours}:${minutes}`;

  let greeting = document.querySelector("#greeting");
  if (hours < 12) {
    greeting.innerHTML = "good morning";
  } else {
    if (hours > 18) {
      greeting.innerHTML = "good evening";
    } else {
      greeting.innerHTML = "good afternoon";
    }
  }
}

// Sending info to Time and Date Function //
let currentTime = new Date();
let dateElement = dateTime(currentTime);

// Enter location button //

function enterLocationButton(event) {
  event.preventDefault();
  let enterLocation = document.querySelector("#searchInput");

  let displayedLocation = document.querySelector("#locationEntered");
  displayedLocation.innerHTML = enterLocation.value;

  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let searchCity = enterLocation.value;
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showWeather);
}

function showWeather(response) {
  console.log(response);
  let newTemp = document.querySelector("#convertTemp");
  let temperature = Math.round(response.data.main.temp);
  newTemp.innerHTML = `${temperature}`;

  let newHumidity = document.querySelector("#humidity");
  newHumidity.innerHTML = response.data.main.humidity;

  let newWind = document.querySelector("#wind");
  newWind.innerHTML = Math.round(response.data.wind.speed);

  let newWeatherCondition = document.querySelector("#condition");
  newWeatherCondition.innerHTML = response.data.weather[0].description;
}

// Entering city / location event
let locationA = document.querySelector("#searchButton");
locationA.addEventListener("submit", enterLocationButton);

function clickFah(event) {
  event.preventDefault();
  let changeF = document.querySelector("#convertTemp");
  changeF.innerHTML = `50`;
}

let fahR = document.querySelector("#degF");
fahR.addEventListener("click", clickFah);

function clickCel(event) {
  event.preventDefault();
  let changeC = document.querySelector("#convertTemp");
  changeC.innerHTML = `10`;
}
let celC = document.querySelector("#degC");
celC.addEventListener("click", clickCel);

/* let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation); */

//let description = document.querySelector("#id")
// description.innerHTML = response.data.weather[0].description;

// let cityElement = document.querySelector("#");
// cityElement.innerHTML = cityId;
