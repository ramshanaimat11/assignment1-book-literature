const form = document.getElementById("registrationForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const selectedEvent = document.getElementById("event").value;

    const registration = {
        fullName: fullName,
        email: email,
        event: selectedEvent
    };

    const registrations = JSON.parse(
        localStorage.getItem("clubRegistrations") || "[]"
    );

    registrations.push(registration);

    localStorage.setItem(
        "clubRegistrations",
        JSON.stringify(registrations)
    );

    formMessage.textContent =
        "Thank you, " + fullName + "! Your registration has been saved.";

    form.reset();
});
const registrationsList = document.getElementById("registrationsList");
const clearAllBtn = document.getElementById("clearAllBtn");

function displayRegistrations() {
    const registrations = JSON.parse(
        localStorage.getItem("clubRegistrations") || "[]"
    );

    registrationsList.replaceChildren();

    if (registrations.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No registrations to display yet.";
        registrationsList.appendChild(message);
        return;
    }

    registrations.forEach(function(registration) {
        const card = document.createElement("article");

        const name = document.createElement("p");
        name.textContent = "Name: " + registration.fullName;

        const email = document.createElement("p");
        email.textContent = "Email: " + registration.email;

        const event = document.createElement("p");
        event.textContent = "Event: " + registration.event;

        card.append(name, email, event);
        registrationsList.appendChild(card);
    });
}

clearAllBtn.addEventListener("click", function() {
    localStorage.removeItem("clubRegistrations");
    displayRegistrations();
});

displayRegistrations();