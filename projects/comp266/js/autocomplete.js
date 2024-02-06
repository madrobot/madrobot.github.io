// Initialize the Google Places Autocomplete API
function initAutocomplete() {
    // Get the input field for the search
    const input = document.getElementById('search-input');
    const options = {
        types: ['(cities)'],
    };

    // Create the autocomplete object
    const autocomplete = new google.maps.places.Autocomplete(input, options);

    // Listen to when the user selects a place from the dropdown
    autocomplete.addListener("place_changed", async function () {
        // Get the city, state and country name from the selected place
        let city = "";
        let state = "";
        let country = "";

        // Get the selected place from the dropdown
        const selectedPlace = autocomplete.getPlace();

        // Get the city, state and country name from selectedPlace
        for (let i = 0; i < selectedPlace.address_components.length; i++) {
            let component = selectedPlace.address_components[i];
            if (component.types.includes("locality")) {
                city = component.long_name;
            }
            if (component.types.includes("administrative_area_level_1")) {
                state = component.short_name;
            }
            if (component.types.includes("country")) {
                country = component.short_name
            }
        }

        // Get the weather data for the user's location
        const weatherData = await getWeatherDataByCity(`${city},${country}`);

        // Update the UI
        updateInterfaceData({
            location: `${city}, ${country}`,
            temp: Math.round(weatherData.main.temp),
            conditions: weatherData.weather[0].main,
            wind: weatherData.wind.speed,
            tempLow: Math.round(weatherData.main.temp_min),
            tempHigh: Math.round(weatherData.main.temp_max),
            visibility: weatherData.visibility,
            humidity: weatherData.main.humidity,
            pressure: weatherData.main.pressure
        });
    });
}

// Set up the event listener for the autocomplete
document.addEventListener("DOMContentLoaded", async function() {
    // Get the form for the search
    const form = document.getElementById("search-form");
    form.addEventListener("submit", function (event) {
        // Stop the submission to be handled by the Google Places plugin
        event.preventDefault();

        // Hide the weather data and show loader
        document.getElementById("city-weather-loader").style.display = "block";
        document.getElementById("city-weather").style.display = "none";
    });

    // Initialize the Google Places Autocomplete API
    initAutocomplete();
});
