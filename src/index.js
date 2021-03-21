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
let first = document.querySelector("#first");
let second = document.querySelector("#second");
let third = document.querySelector("#third");
let fourth = document.querySelector("#fourth");
let fifth = document.querySelector("#fifth");

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
first.innerHTML= days[now.getDay()+1];
second.innerHTML=days[now.getDay()+2];
third.innerHTML=days[now.getDay()+3];
fourth.innerHTML=days[now.getDay()+4];
fifth.innerHTML=days[now.getDay()+5];
 



function displayWeatherConditions(response){
document.querySelector("#city").innerHTML=response.data.name;
document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp) +  "°C" ;
document.querySelector("#wind").innerHTML = "wind         " + Math.round(response.data.wind.speed)+"m/s";
document.querySelector("#humidity").innerHTML= "humidity       "+(response.data.main.humidity)+"%";
document.querySelector("#feelsLike").innerHTML= "feels like     "+ Math.round(response.data.main.feels_like)+"°C";
document.querySelector("#weatherDescription").innerHTML =response.data.weather[0].description;
if (response.data.rain!==undefined){
  document.querySelector("#precipitation").innerHTML = response.data.rain["1h"]+"mm/h";
}else{
  document.querySelector("#precipitation").innerHTML="no rain";
  document.querySelector("#icon").setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  document.querySelector("#icon").setAttribute("alt", response.data.weather[0].description);
};
};






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



let searchForm = document.querySelector("#form");
searchForm.addEventListener("submit", search);



