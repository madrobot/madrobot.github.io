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

function displayAlert(message, style) {
    const alert = document.getElementById("alert");
    alert.textContent = message;
    alert.className = style;
}

function hideAlert() {
    const alert = document.getElementById("alert");
    alert.style.opacity = "1";
    (function fade() {
        if ((alert.style.opacity -= ".05") < 0) {
            alert.style.display = "none";
            alert.className = "";
        } else {
            requestAnimationFrame(fade);
        }
    })();
}

document.addEventListener("DOMContentLoaded", async function() {
    // Set up the event listener for the alert close button
    const closeAlertButton = document.getElementById("alert");
    closeAlertButton.addEventListener("click", hideAlert);

    // Get the user's location
    let userLocation;
    try {
        userLocation = await getUserLocation();
        displayAlert("Your location is: " + userLocation.latitude + ", " + userLocation.longitude, "success");
    } catch (error) {
        displayAlert("An error occurred while getting your location: " + error.message, "error");
    }

    // TODO: Next step is to use the user's location to get the weather data
});

