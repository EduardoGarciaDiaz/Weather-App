function getForecastWeather() {
    let city = document.getElementById("city-name-input").value;

    if (city === "" || city === null || city === undefined) {
        clearWeatherInfo();
        alert("Por favor, ingrese una ciudad");
        return;
    }

    const URL_QUERY = `${API_URL_BASE}/forecast?q=${city}&appid=${API_KEY}&lang=es&units=metric`;
    fetch(URL_QUERY)
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
    })
    .then((data) => {
        console.log(data);
        clearWeatherInfo();
        showtWeatherResultDiv(data.city);
        for (let i = 4; i < data.list.length ; i += 8) {
            createtWeatherCard(data.list[i], i);
        }
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

function showtWeatherResultDiv(city) {
    const weatherResultDiv = document.getElementById('weather-result');

    const additionalElement = document.createElement('h2');
    additionalElement.id = 'city-name-forecast';
    additionalElement.textContent = city.name + ', ' + city.country;

    weatherResultDiv.style.visibility = 'visible';
}

function createtWeatherCard(data) {
    const weatherInfoDiv = document.createElement('div');
    weatherInfoDiv.id = 'weather-info-forecast';

    const weatherDay = document.createElement('p');
    weatherDay.id = 'weather-day';
    weatherDay.textContent = "Día " + data.dt_txt;

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

    weatherInfoDiv.appendChild(weatherDay);
    weatherInfoDiv.appendChild(weatherDescription);
    weatherInfoDiv.appendChild(temperatureSection);
    weatherInfoDiv.appendChild(feelsLike);

    document.getElementById('weather-result').appendChild(weatherInfoDiv);
}