// function to fetch weather by location

function getWeatherByCoordinates() {
    // Get the current position of the device
    navigator.geolocation.getCurrentPosition(function(position) {
        // Retrieve the latitude and longitude from the position object
        const latitude = position.coords.latitude.toString();
        const longitude = position.coords.longitude.toString();
        const coordiantes=latitude+', '+longitude;
        const url= 'https://weatherapi-com.p.rapidapi.com/current.json?q=' + coordiantes;
        // Do something with the latitude and longitude
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
        const xhr = new XMLHttpRequest();
        xhr.withCredentials = true;
        
        xhr.addEventListener('readystatechange', function () {
            if (this.readyState === this.DONE) {
                if (this.status === 200) {
                    displayWeatherInfo(this.responseText);
                } else {
                    console.error('Error fetching weather data. Status:', this.status);
                    alert("No Such Location found!!!, Please enter a valid location or coordinate");
                }
            }
        });
    
        xhr.onerror = function () {
            console.error('An error occurred during the request.');
        };
    
        xhr.open('GET', url);
        xhr.setRequestHeader('X-RapidAPI-Key', 'c4740aea08msh56f4945256fc23ap1aba5ejsnf54583c100f1');
        xhr.setRequestHeader('X-RapidAPI-Host', 'weatherapi-com.p.rapidapi.com');
        xhr.send();
    
    }, function(error) {
        // Handle any errors that occur while retrieving the location
        console.error('Error getting location:', error.message);
    });
} 
// function to fetch weather by city name
function getWeather(){
    const cityName = document.getElementById('get-city-name').value;
    const url = 'https://weatherapi-com.p.rapidapi.com/current.json?q=' + cityName;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    
    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            if (this.status === 200) {
                displayWeatherInfo(this.responseText);
            } else {
                console.error('Error fetching weather data. Status:', this.status);
                alert("No Such Location found!!!, Please enter a valid location or coordinate");
            }
        }
    });

    xhr.onerror = function () {
        console.error('An error occurred during the request.');
    };

    xhr.open('GET', url);
    xhr.setRequestHeader('X-RapidAPI-Key', 'c4740aea08msh56f4945256fc23ap1aba5ejsnf54583c100f1');
    xhr.setRequestHeader('X-RapidAPI-Host', 'weatherapi-com.p.rapidapi.com');
    xhr.send();

}

function displayWeatherInfo(weatherData) {
    const data = JSON.parse(weatherData);
    // const myDiv=document.getElementById('getWeatherDetails');
    // if(myDiv.style.display==='none'){
    //     myDiv.style.display='block'
    // }else {
    //     myDiv.style.display='none';
    // }
    const currentWeather = data.current;
    if (currentWeather) {
        const temperatureElement = document.getElementById('temperature');
        const localTimeElement=document.getElementById('localTime');
        const feelsLikeElement=document.getElementById('feelsLike');
        const locationElement = document.getElementById('location');
        const conditionElement = document.getElementById('condition');
        const windElement = document.getElementById('wind');
        const humidityElement = document.getElementById('humidity');
        locationElement.textContent = 'Location: ' + data.location.name + ', ' + data.location.region + ', ' + data.location.country;
        if (feelsLikeElement) {
            feelsLikeElement.textContent = 'Feels Like: ' + currentWeather.feelslike_c + ' °C';
        } else {
            console.error('Element with ID "feelsLike" not found.');
        }
        temperatureElement.textContent = 'Temperature: ' + currentWeather.temp_c + ' °C';
        localTimeElement.textContent=retunDay(data.location.localtime)+', '+ formatTime12Hour(data.location.localtime);
        if (conditionElement) {
            const conditionText = 'Condition: ' + currentWeather.condition.text;
            let conditionHTML = conditionText;
        
            if (currentWeather.condition.text === 'Partly cloudy' || currentWeather.condition.text === 'Partly Cloudy ') {
                if(dayOrNight(data.location.localtime)==='day'){
                    conditionHTML += `<img src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy-day-1.svg" alt="Partly Cloudy Day Icon">`;
                }
                else{
                    conditionHTML += `<img src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy-night-1.svg" alt="Partly Cloudy Night Icon">`;
                }
            }
            if (currentWeather.condition.text === 'Mist' ||currentWeather.condition.text === 'Cloudy' || currentWeather.condition.text==='Overcast') {
                if(dayOrNight(data.location.localtime)==='day'){
                    conditionHTML += `<img src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy.svg" alt="Cloudy Day Icon">`;
                }
                else{
                    conditionHTML += `<img src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy.svg" alt="Cloudy Night Icon">`;
                }
            }
            if (currentWeather.condition.text === 'Clear'||currentWeather.condition.text === 'Sunny') {
                if(dayOrNight(data.location.localtime)==='day'){
                    conditionHTML += `<img src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/day.svg" alt="Clear Day Icon">`;
                }
                else{
                    conditionHTML += `<img src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/night.svg" alt="Clear Night Icon">`;
                }
            }

            if (currentWeather.condition.text === 'Light rain shower'||currentWeather.condition.text === 'Patchy rain nearby'||currentWeather.condition.text==='Light freezing rain') {
                if(dayOrNight(data.location.localtime)==='day'){
                    conditionHTML += `<img src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-1.svg" alt="Light Rain Day Icon">`;
                }
                else{
                    conditionHTML += `<img src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/rainy-5.svg" alt="Light Rain Night Icon">`;
                }
            }
            conditionElement.innerHTML = conditionHTML;
        } else {
            console.error('Element with ID "condition" not found.');
        }

        windElement.textContent = 'Wind: ' + currentWeather.wind_kph + ' kph ' + currentWeather.wind_dir;
        humidityElement.textContent = 'Humidity: ' + currentWeather.humidity + '%';
    } else {
        console.error('Invalid weather data format:', data);
    }
}


// gets formatted time from local time
function formatTime12Hour(dateTimeString) {
    // Create a Date object from the provided date-time string
    const date = new Date(dateTimeString);

    // Get hours and minutes from the Date object
    let hours = date.getHours();
    let minutes = date.getMinutes();

    // Determine AM or PM
    const meridiem = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12 || 12;

    // Add leading zero to minutes if needed
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Construct the formatted time string
    const formattedTime = hours + '.' + minutes + ' ' + meridiem;

    return formattedTime;
}

function retunDay(dateTimeString){
    const date =new Date(dateTimeString);
    let days= date.getDay();
    if (days===1)
    {
        return 'Monday';
    }
    if (days===2)
    {
        return 'Tuesday';
    }
    if (days===3)
    {
        return 'Wednesday';
    }
    if (days===4)
    {
        return 'Thursday';
    }
    if (days===5)
    {
        return 'Friday';
    }
    if (days===6)
    {
        return 'Saturday';
    }
    if (days===7)
    {
        return 'Sunday';
    }
}
function dayOrNight(dateTimeString){
    const date= new Date(dateTimeString);
    let hours=date.getHours();

    if(hours> 6 && hours <18)
    {
        return 'day';
    }
    else 
    {
        return 'night';
    }
}


