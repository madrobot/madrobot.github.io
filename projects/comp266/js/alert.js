// Shows a message with a given style
function displayAlert(message, style) {
    const alert = document.getElementById("alert");
    alert.textContent = message;
    alert.className = style;
}

// Hides the alert message
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

// Set up the event listener for the alert close button
document.addEventListener("DOMContentLoaded", async function() {
    document.getElementById("alert").addEventListener("click", hideAlert);
});
