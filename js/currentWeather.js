const API_URL_BASE = "https://api.openweathermap.org/data/2.5";
const API_KEY = "f9e6a20f08ba9a71b6a0244f68a846eb";


function getCurrentWeather() {
    let city = document.getElementById("city-name-input").value;

    if (city === "" || city === null || city === undefined) {
        clearWeatherInfo();
        alert("Por favor, ingrese una ciudad");
        return;
    }

    const URL_QUERY = `${API_URL_BASE}/weather?q=${city}&appid=${API_KEY}&lang=es&units=metric`;

    fetch(URL_QUERY)
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
    })
    .then((data) => {
        clearWeatherInfo();
        showCurrentWeatherCard(data);
    })
    .catch((error) => {
        alert("No se encontraron resultados para la ciudad ingresada");
        clearWeatherInfo();
        console.error(error);
    })
}

function clearWeatherInfo() {
    let weatherResultDiv = document.getElementById('weather-result');
    weatherResultDiv.style.visibility = 'hidden';
    let weatherInfoDiv = document.getElementById('weather-info');
    if (weatherInfoDiv) {
        weatherInfoDiv.remove();
    }
}

function showCurrentWeatherCard(data) {
    const weatherResultDiv = document.getElementById('weather-result');
    weatherResultDiv.style.visibility = 'visible';

    let weatherInfoDiv = createCurrentWeatherCard(data);
    document.getElementById('weather-result').appendChild(weatherInfoDiv);
}

function createCurrentWeatherCard(data) {
    const weatherInfoDiv = document.createElement('div');
    weatherInfoDiv.id = 'weather-info';

    const cityName = document.createElement('h2');
    cityName.id = 'city-name';
    cityName.textContent = data.name + ', ' + data.sys.country; 

    const weatherDescription = document.createElement('p');
    weatherDescription.id = 'weather-description';
    weatherDescription.textContent = data.weather[0].description;

    const temperatureSection = document.createElement('div');
    temperatureSection.id = 'temperature-section';

    const weatherIcon = document.createElement('img');
    weatherIcon.id = 'weather-icon';
    weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`; 
    weatherIcon.alt = 'Icono del clima';

    const temperature = document.createElement('p');
    temperature.id = 'temperature';
    temperature.textContent = data.main.temp + '° C'; 

    temperatureSection.appendChild(weatherIcon);
    temperatureSection.appendChild(temperature);

    const feelsLike = document.createElement('p');
    feelsLike.id = 'feels-like';
    feelsLike.textContent = `Sensación térmica: ${data.main.feels_like} ° C`; 

    const extraDetails = document.createElement('div');
    extraDetails.id = 'extra-details';

    const humidity = document.createElement('p');
    humidity.id = 'humidity';
    humidity.textContent = `Humedad: ${data.main.humidity}%`; 

    const windSpeed = document.createElement('p');
    windSpeed.id = 'wind-speed';
    windSpeed.textContent = `Velocidad del viento: ${data.wind.speed} m/s`; 

    const maxTemp = document.createElement('p');
    maxTemp.id = 'max-temp';
    maxTemp.textContent = `Temp Max: ${data.main.temp_max}° C`; 

    const minTemp = document.createElement('p');
    minTemp.id = 'min-temp';
    minTemp.textContent = `Temp Min: ${data.main.temp_min}° C`; 

    extraDetails.appendChild(humidity);
    extraDetails.appendChild(windSpeed);
    extraDetails.appendChild(maxTemp);
    extraDetails.appendChild(minTemp);

    weatherInfoDiv.appendChild(cityName);
    weatherInfoDiv.appendChild(weatherDescription);
    weatherInfoDiv.appendChild(temperatureSection);
    weatherInfoDiv.appendChild(feelsLike);
    weatherInfoDiv.appendChild(extraDetails);

    return weatherInfoDiv;
}