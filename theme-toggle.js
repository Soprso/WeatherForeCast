// Get the button element

const toggleSwitch = document.getElementById('themeToggle');

// Add event listener for the toggle switch
toggleSwitch.addEventListener('change', switchTheme);

    // Get the current theme link element
    const currentTheme = document.getElementById('theme');

// Function to switch between light and dark themes
function switchTheme() {
    if (toggleSwitch.checked) {
        // Switch to dark theme
        currentTheme.setAttribute('href', 'dark-theme.css');
    } else {
        // Switch to light theme
        currentTheme.setAttribute('href', 'Style.css');
    }
}