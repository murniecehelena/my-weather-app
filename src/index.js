let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
     "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

let date = document.querySelector("#date");
let time = document.querySelector("#time");



let now = new Date();
let currentDay = days[now.getDay()];
let currentDate = now.getDate();
let hours = now.getHours();
if (hours<10) {
    hours = `0${hours}`
}
let minutes = now.getMinutes();
if (minutes<10) {
    minutes=`0${minutes}`
}
let currentMonth =now.getMonth();
if (currentMonth<12){
    currentMonth=now.getMonth()+1
} 

date.innerHTML = `${currentDay}, ${currentDate}/${currentMonth}`
time.innerHTML= `${hours}:${minutes}`

 function formatHours(timestamp){
  let now = new Date(timestamp);
let hours = now.getHours();
if (hours<10) {
    hours = `0${hours}`
}
let minutes = now.getMinutes();
if (minutes<10) {
    minutes=`0${minutes}`
}
return `${hours}:${minutes}`;
};



function displayWeatherConditions(response){
document.querySelector("#city").innerHTML=response.data.name;
document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
document.querySelector("#wind").innerHTML = "wind         " + Math.round(response.data.wind.speed)+"m/s";
document.querySelector("#humidity").innerHTML= "humidity       "+(response.data.main.humidity)+"%";
document.querySelector("#feelsLike").innerHTML= "feels like     "+ Math.round(response.data.main.feels_like)+"°C";
document.querySelector("#weatherDescription").innerHTML =response.data.weather[0].description;
if (response.data.rain!==undefined){
  document.querySelector("#precipitation").innerHTML = response.data.rain["1h"]+"mm/h";
}else{
  document.querySelector("#precipitation").innerHTML="no rain";};
  document.querySelector("#icon").setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);

celsiusTemperature = response.data.main.temp;
};


function showFahrenheit(event){
event.preventDefault();
celsiusLink.classList.remove("active");
fahrenheitLink.classList.add("active");
let fahrenheit=((celsiusTemperature)*9)/5+32;
document.querySelector("#temperature").innerHTML = Math.round(fahrenheit);
};

function showCelsius(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
  document.querySelector("#temperature").innerHTML =Math.round(celsiusTemperature);
};

function displayForecast(response){
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML=null;
  let forecast = null;
for (let index = 0; index < 5; index++) {
  forecast = response.data.list[index];
    forecastElement.innerHTML+=`
                       <div class="col mx-1">
                                        <div class="DayContainer-Element center">
                                            <p class="AlignText-Center WeekDays" id="first">${formatHours(forecast.dt * 1000)}</p>
                                            <div class="DayContainer-ElementCircle center">
                                                <p class="AlignText-Center Temperature" id="FirstTemperature">${Math.round(forecast.main.temp_max)}/${Math.round(forecast.main.temp_min)}</p>
                                                <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" class=" Icon" id="iconOne"></p>
                                            </div>
                                        </div>
                          </div>
                                    `;
}
  
  };


let celsiusTemperature=null;

let searchForm = document.querySelector("#form");
searchForm.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheit );

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius );


function search(event){
event.preventDefault();
let apiKey = "76f9f2909bf68e0c3cbd1d951b779a49";
let units = "metric";
let city= document.querySelector("#search-form").value;
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`
axios.get(apiUrl).then(displayWeatherConditions);

 apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(displayForecast);

}
