// API key for Open Weather Map
const weatherApiKey = "e556c6f5e190c2dcaa26a15e91cc955b";
const weatherBaseUri = "https://api.openweathermap.org/data/2.5";

// Fetch weather data from Open Weather Map API using a city name
async function getWeatherDataByCity(city) {
    // Fetch the weather data from Open Weather Map API
    const response = await fetch(`${weatherBaseUri}/weather?q=${city}&units=metric&appid=${weatherApiKey}`);

    // Check if the response is OK
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const data = response.json();

    // Check if the city is not found
    if (data.cod === "404") {
        throw new Error("City not found");
    }

    return data;
}

// Fetch weather data from Open Weather Map API using a city name
async function getWeatherDataByLatLong(lat, lon) {
    // Fetch the weather data from Open Weather Map API
    const response = await fetch(`${weatherBaseUri}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`);

    // Check if the response is OK
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const data = response.json();

    // Check if the city is not found
    if (data.cod === "404") {
        throw new Error("City not found");
    }

    return data;
}
