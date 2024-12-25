let inputCity = document.querySelector('#input-city');
let day = document.querySelector('#day');
let dateIn = document.querySelector('#date');
let time = document.querySelector('#time');
let weatherStatus = document.querySelector('#weather-status');
let image = document.querySelector('#image');
let temp = document.querySelector('#temp');
let tempMax = document.querySelector('#max-temp');
let tempMin = document.querySelector('#min-temp');
let windSpeed = document.querySelector('#wind-speed');
let humidity = document.querySelector('#humidity');
let pressure = document.querySelector('#pressure');
let sunriseTime = document.querySelector('#sunrise-time');
let sunsetTime = document.querySelector('#sunset-time');
inputCity.addEventListener('keyup', getWeatherData);

function getWeatherData(e){
    if(e.keyCode === 13){
        let xml = new XMLHttpRequest();
        xml.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q='+ inputCity.value +'&appid={API key}&units=metric');

        xml.onreadystatechange = function(){
            if(xml.readyState === 4 && xml.status === 200){
            displayWeaterData(JSON.parse(xml.responseText));
            }
        }
        xml.send()
    }
}

function displayWeaterData(data){
    console.log(data);
    
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let monts = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    let date = new Date();
    let localTime = date.getTime();
    let localOffset = date.getTimezoneOffset() * 60000;
    let utc = localTime + localOffset;
    let utcTime = utc + 1000 * data.timezone;
    let newCity = new Date(utcTime);
    day.innerHTML = days[newCity.getDay()];
    dateIn.innerHTML = `${newCity.getDate()} ${monts[newCity.getMonth()]}, ${newCity.getFullYear()}`;
    let cityHours = newCity.getHours();
    let cityMinutes = newCity.getMinutes();
    cityHours < 10 ? cityHours = "0" + cityHours : cityHours = cityHours;
    cityMinutes < 10 ? cityMinutes = "0" + cityMinutes : cityMinutes = cityMinutes;
    time.innerHTML = cityHours + ":" + cityMinutes + " h";
    
    weatherStatus.innerHTML = `Weather Status: ${data.weather[0].description}`;
    image.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    temp.innerHTML = `${Math.round(data.main.temp)} &degC`;
    tempMax.innerHTML = `Max.temp: ${Math.round(data.main.temp_max)} &degC`;
    tempMin.innerHTML = `Min.temp: ${Math.round(data.main.temp_min)} &degC`;

    let msunrise = new Date(data.sys.sunrise * 1000).getMinutes();
    let msunset = new Date(data.sys.sunset * 1000).getMinutes();
    let hsunrise = new Date(data.sys.sunrise * 1000).getHours();
    let hsunset = new Date(data.sys.sunset * 1000).getHours();
    (msunrise < 10) ? msunrise = "0" + msunrise : msunrise = msunrise;
    (msunset < 10) ? msunset = "0" + msunset : msunset = msunset;
    (hsunrise < 10) ? hsunrise = "0" + hsunrise : hsunrise = hsunrise;
    (hsunset < 10) ? hsunset = "0" + hsunset : hsunset = hsunset;

    sunriseTime.innerHTML = hsunrise + ":" + msunrise + " h";
    sunsetTime.innerHTML = hsunset + ":" + msunset + " h";
    windSpeed.innerHTML = data.wind.speed + " Km/h";
    humidity.innerHTML = data.main.humidity + " %";
    pressure.innerHTML = data.main.pressure + " hPa";

}