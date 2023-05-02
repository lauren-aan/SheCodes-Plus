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

// Function using the data from the API
function displayTemperature(response) {
  console.log(response.data.time);
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
}

// API Call
let key = "a3co8cfc69t20f3a05200f0a3ac4b3e8";
let query = "Houston";
let units = "metric";
let url = `https://api.shecodes.io/weather/v1/current?query=${query}&key=${key}&units=${units}`;

axios.get(url).then(displayTemperature);
