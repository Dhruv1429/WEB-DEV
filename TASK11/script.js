// 1. The "Mock" Database (Hardcoded Data)
const weatherDatabase = {
    "gurugram": { temp: "32°C", city: "Gurugram", humidity: "45%", wind: "10 km/h", icon: "fa-sun" },
    "vaddeswaram": { temp: "30°C", city: "Vaddeswaram", humidity: "70%", wind: "15 km/h", icon: "fa-cloud-rain" },
    "delhi": { temp: "34°C", city: "New Delhi", humidity: "40%", wind: "12 km/h", icon: "fa-smog" },
    "mumbai": { temp: "28°C", city: "Mumbai", humidity: "85%", wind: "20 km/h", icon: "fa-cloud-showers-heavy" },
    "bangalore": { temp: "22°C", city: "Bangalore", humidity: "50%", wind: "18 km/h", icon: "fa-cloud" }
};

// 2. Select Elements
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherBox = document.getElementById("weather-box");
const errorMsg = document.getElementById("error-msg");

// Elements to update
const tempEl = document.getElementById("temp");
const cityEl = document.getElementById("city");
const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const iconEl = document.getElementById("weather-icon");

// 3. Main Function
function checkWeather() {
    const city = cityInput.value.toLowerCase().trim(); // Convert input to lowercase

    if (weatherDatabase[city]) {
        // City Found: Get data
        const data = weatherDatabase[city];

        // Update HTML
        tempEl.innerText = data.temp;
        cityEl.innerText = data.city;
        humidityEl.innerText = data.humidity;
        windEl.innerText = data.wind;

        // Update Icon (Remove old class, add new class)
        iconEl.className = `fa-solid ${data.icon}`;

        // Show Weather, Hide Error
        weatherBox.classList.remove("hidden");
        errorMsg.classList.add("hidden");
    } else {
        // City Not Found
        weatherBox.classList.add("hidden");
        errorMsg.classList.remove("hidden");
    }
}

// 4. Add Event Listener to Button
searchBtn.addEventListener("click", checkWeather);

// Optional: Allow pressing "Enter" key
cityInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        checkWeather();
    }
});