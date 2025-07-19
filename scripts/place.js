// Static values for temperature and wind speed
const temperature = 27; // Celsius
const windSpeed = 12.5; // km/h (average of 10-15 km/h range)

// Function to calculate windchill factor
function calculateWindChill(temp, wind) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16);
}

// Function to display windchill
function displayWindChill() {
    // Conditions for windchill calculation (Celsius and km/h):
    // Temperature <= 10°C and wind speed > 4.8 km/h
    if (temperature <= 10 && windSpeed > 4.8) {
        const windchill = calculateWindChill(temperature, windSpeed);
        document.querySelector('#windchill').textContent = `${windchill.toFixed(1)}°C`;
    } else {
        document.querySelector('#windchill').textContent = 'N/A';
    }
}

// Update footer with current year and last modified date
function updateFooter() {
    const currentYear = new Date().getFullYear();
    const lastModified = document.lastModified;

    document.querySelector('#currentyear').textContent = `© ${currentYear} 💲 Awuah Dennis 💲. Accra, Ghana.`;
    document.querySelector('#last-updated').textContent = `Last updated: ${lastModified}`;
}

// Run when page loads
document.addEventListener('DOMContentLoaded', function() {
    displayWindChill();
    updateFooter();
});