function updateInterfaceData(data) {
    // Get the DOM containers to set the data
    const cityContainer = document.getElementById("city");
    const dateContainer = document.getElementById("date");
    const tempContainer = document.getElementById("temp");
    const conditionsContainer = document.getElementById("conditions");
    const windContainer = document.getElementById("wind");
    const tempLowContainer = document.getElementById("temp-low");
    const tempHighContainer = document.getElementById("temp-high");
    const visibilityContainer = document.getElementById("visibility");
    const humidityContainer = document.getElementById("humidity");
    const pressureContainer = document.getElementById("pressure");

    // Set the data in the DOM
    cityContainer.textContent = data.location;
    dateContainer.textContent = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    tempContainer.textContent = data.temp;
    conditionsContainer.textContent = data.conditions;
    windContainer.textContent = data.wind;
    tempLowContainer.textContent = data.tempLow;
    tempHighContainer.textContent = data.tempHigh;
    visibilityContainer.textContent = data.visibility;
    humidityContainer.textContent = data.humidity;
    pressureContainer.textContent = data.pressure;

    // Show the DOM element
    document.getElementById("city-weather-loader").style.display = "none";
    document.getElementById("city-weather").style.display = "block";
}
