// Initiate the popular cities list
document.addEventListener("DOMContentLoaded", async function () {
    // Get the weather data for the popular cities
    const [paris, newYork, bangkok, london] = await Promise.all([
        getWeatherDataByCity("Paris,FR"),
        getWeatherDataByCity("New York,US"),
        getWeatherDataByCity("Bangkok,TH"),
        getWeatherDataByCity("London,GB")
    ])

    // Get the containers for the popular cities
    const parisContainer = document.getElementById("popular-city-1");
    const newYorkContainer = document.getElementById("popular-city-2");
    const bangkokContainer = document.getElementById("popular-city-3");
    const londonContainer = document.getElementById("popular-city-4");

    // Display the temperature for each city
    parisContainer.textContent = Math.round(paris.main.temp);
    newYorkContainer.textContent = Math.round(newYork.main.temp);
    bangkokContainer.textContent = Math.round(bangkok.main.temp);
    londonContainer.textContent = Math.round(london.main.temp);
});
