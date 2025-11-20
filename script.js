// --- Select Elements ---
const themeIcon = document.getElementById("theme-icon");
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

// --- Theme Toggle Functionality ---
themeIcon.addEventListener("click", () => {
    // Toggle the light-mode class on body
    body.classList.toggle("light-mode");

    // Switch the icon based on the mode
    if (body.classList.contains("light-mode")) {
        themeIcon.classList.remove("fa-sun");
        themeIcon.classList.add("fa-moon");
    } else {
        themeIcon.classList.remove("fa-moon");
        themeIcon.classList.add("fa-sun");
    }
});

// --- Mobile Menu Functionality ---
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});