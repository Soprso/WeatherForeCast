// Get the button element
const toggleSwitch = document.getElementById('themeToggle');

// Get the current theme link element
const currentTheme = document.getElementById('theme');

// Function to switch between light and dark themes
function switchTheme() {
    if (toggleSwitch.checked) {
        // Switch to dark theme
        currentTheme.setAttribute('href', 'dark-theme.css');
        // Store the selected theme preference in local storage
        localStorage.setItem('theme', 'dark');
    } else {
        // Switch to light theme
        currentTheme.setAttribute('href', 'Style.css');
        // Store the selected theme preference in local storage
        localStorage.setItem('theme', 'light');
    }
}

// Apply the stored theme preference when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
        // Apply the dark theme
        toggleSwitch.checked = true;
        switchTheme();
    } else {
        // Apply the light theme (default)
        toggleSwitch.checked = false;
    }
});

// Add event listener for the toggle switch
toggleSwitch.addEventListener('change', switchTheme);
