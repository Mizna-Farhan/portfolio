// EXPERIENCE TABS

const experienceTabs = document.querySelectorAll(".experience-tab");

const experiencePanels = document.querySelectorAll(".experience-panel");

experienceTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        // Remove active class from all tabs
        experienceTabs.forEach(item => {
            item.classList.remove("active");
        });

        // Hide all experience panels
        experiencePanels.forEach(panel => {
            panel.classList.remove("active");
        });

        // Activate clicked tab
        tab.classList.add("active");

        // Display matching experience
        const selectedExperience = tab.dataset.experience;

        document.getElementById(selectedExperience).classList.add("active");

    });

});


// BACK TO TOP BUTTON

const backToTop = document.getElementById("backToTop");

// Show button when user scrolls down
window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {
        backToTop.style.display = "flex";
    } else {
        backToTop.style.display = "none";
    }

});

// Return to top when button is clicked
backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// MOBILE MENU (HAMBURGER)

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// Open / close the menu when the button is clicked
menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.textContent = isOpen ? "✕" : "☰";

});

// Close the menu after choosing a link
navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.textContent = "☰";
    });

});


// HIGHLIGHT CURRENT SECTION IN NAV

const pageSections = document.querySelectorAll("main section[id]");
const navAnchors = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    pageSections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 140) {
            currentSection = section.id;
        }
    });

    navAnchors.forEach(anchor => {
        anchor.classList.toggle(
            "active",
            anchor.getAttribute("href") === "#" + currentSection
        );
    });

});


// CONTACT FORM VALIDATION

// TODO: put your real email address here
const MY_EMAIL = "miznafarhan2005@gmail.com";

const contactForm = document.getElementById("contactForm");
const nameInput = document.getElementById("nameInput");
const emailInput = document.getElementById("emailInput");
const messageInput = document.getElementById("messageInput");
const formStatus = document.getElementById("formStatus");

function showError(input, message) {
    input.classList.add("invalid");
    input.parentElement.querySelector(".error-message").textContent = message;
}

function clearError(input) {
    input.classList.remove("invalid");
    input.parentElement.querySelector(".error-message").textContent = "";
}

// Remove the error as soon as the user starts typing again
[nameInput, emailInput, messageInput].forEach(input => {
    input.addEventListener("input", () => clearError(input));
});

contactForm.addEventListener("submit", event => {

    // Stop the page from reloading
    event.preventDefault();

    formStatus.textContent = "";

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    let isValid = true;

    if (name.length < 2) {
        showError(nameInput, "Please enter your name.");
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        showError(emailInput, "Please enter a valid email address.");
        isValid = false;
    }

    if (message.length < 10) {
        showError(messageInput, "Message should be at least 10 characters.");
        isValid = false;
    }

    if (!isValid) {
        return;
    }

    // Open the visitor's email app with the message filled in
    const subject = encodeURIComponent("Portfolio message from " + name);
    const body = encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")");

    window.location.href = "mailto:" + MY_EMAIL + "?subject=" + subject + "&body=" + body;

    formStatus.textContent = "Thank you, " + name + "! Your email app should open now.";
    contactForm.reset();

});
