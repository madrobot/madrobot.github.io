// Handle contact form submission
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", function (event) {
        // Stop the submission
        event.preventDefault();

        // Get the data from the form to submit to server
        const data = new FormData(event.target);

        // Submit the form using Fetch
        fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                displayAlert("Thanks for your submission!", "success");
                form.reset()
            } else {
                response.json().then(data => {
                    if (Object.hasOwn(data, 'errors')) {
                        displayAlert(data["errors"].map(error => error["message"]).join(", "), "error")
                    } else {
                        displayAlert("Oops! There was a problem submitting your form", "error")
                    }
                })
            }
        }).catch(error => {
            displayAlert("Oops! There was a problem submitting your form", "error")
        });
    });
});
