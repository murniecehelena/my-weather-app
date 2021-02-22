let days = [
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
let time = document.querySelector("#time")

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

function displayWeatherConditions(response){
document.querySelector("#city").innerHTML=response.data.name;
document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp) ;
}

function search(event){
event.preventDefault();
let apiKey = "76f9f2909bf68e0c3cbd1d951b779a49";
let units = "metric";
let city= document.querySelector("#search-form").value;
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`
axios.get(apiUrl).then(displayWeatherConditions);
}

let searchForm = document.querySelector("#form");
searchForm.addEventListener("submit", search);

let cityElement=document.querySelector("#city");
cityElement.innerHTML=cityInput.value+ " 4°C"+" 🌞"

