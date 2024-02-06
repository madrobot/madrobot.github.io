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
    autocomplete.addListener("place_changed", function () {
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

        // TODO: Next step is to use the user's location to get the weather data
        displayAlert("You selected " + city + ", " + state + ", " + country + " as your location.", "info");
    });
}

// Set up the event listener for the autocomplete
document.addEventListener("DOMContentLoaded", async function() {
    // Get the form for the search
    const form = document.getElementById("search-form");
    form.addEventListener("submit", function (event) {
        // Stop the submission to be handled by the Google Places plugin
        event.preventDefault();
    });

    // Initialize the Google Places Autocomplete API
    initAutocomplete();
});
