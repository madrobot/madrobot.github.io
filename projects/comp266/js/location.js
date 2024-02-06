// Define the Google API key
const googleApiKey = 'AIzaSyBmLy4hj7duOdtv9unVFLaaOEoGH_rNhlM';

// Get the user's location using the Geolocation API
async function getUserLocation() {
    return new Promise((resolve, reject) => {
        // Check if geolocation is available in the browser
        // Reference: https://bootcamp.uxdesign.cc/how-to-get-user-location-in-the-browser-using-javascript-c84e10ec9584
        if ("geolocation" in navigator) {
            // Get the user's current location
            navigator.geolocation.getCurrentPosition(function(position) {
                // The user's latitude and longitude are in position.coords.latitude and position.coords.longitude
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                resolve({ latitude, longitude });
            }, function(error) {
                // Handle errors, if any
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        reject(new Error("User denied the request for geolocation."));
                        break;
                    case error.POSITION_UNAVAILABLE:
                        reject(new Error("Location information is unavailable."));
                        break;
                    case error.TIMEOUT:
                        reject(new Error("The request to get user location timed out."));
                        break;
                    default:
                        reject(new Error("An unknown error occurred."));
                        break;
                }
            });
        } else {
            reject(new Error("Geolocation is not available in this browser."));
        }
    });
}

// Reverse geocode the user's location to get the city name, state and country
async function reverseGeocode(latitude, longitude) {
    // Fetch the city name from Google API
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&key=${googleApiKey}`);

    // Check if the response is OK
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Check if the city is not found
    if (data.status === "ZERO_RESULTS") {
        throw new Error("City not found");
    }

    // Get the city name
    return {
        city: data.results[0].address_components.find(component => component.types.includes("locality")).long_name,
        state: data.results[0].address_components.find(component => component.types.includes("administrative_area_level_1")).short_name,
        country: data.results[0].address_components.find(component => component.types.includes("country")).short_name
    }
}

// Load the user's location and fetch the weather data
document.addEventListener("DOMContentLoaded", async function() {
    // Get the user's location
    let userLatLong;
    try {
        userLatLong = await getUserLocation();
    } catch (error) {
        displayAlert("An error occurred while getting your location: " + error.message, "error");
        return;
    }

    // Show the city weather loader
    document.getElementById("city-weather-loader").style.display = "block";

    // Reverse geocode the user's location
    let userLocation;
    try {
        userLocation = await reverseGeocode(userLatLong.latitude, userLatLong.longitude);
    } catch (error) {
        displayAlert("An error occurred while getting your location: " + error.message, "error");
        document.getElementById("city-weather-loader").style.display = "none";
        return;
    }

    // Get the weather data for the user's location
    const weatherData = await getWeatherDataByLatLong(userLatLong.latitude, userLatLong.longitude);

    // Update the UI
    updateInterfaceData({
        location: `${userLocation.city}, ${userLocation.country}`,
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
