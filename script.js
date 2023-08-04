const apiUrl = "https://danepubliczne.imgw.pl/api/data/synop/station/";
const fromEl = document.querySelector(".options");
const searchBtn = document.querySelector(".search");
const weather = document.querySelector(".weather");
const error = document.querySelector(".error");
const cityName = document.querySelector(".city");
const cityTemp = document.querySelector(".temp");
const cityPressure = document.querySelector(".pressure");
const cityRainfall = document.querySelector(".rainfall");
const date = document.querySelector(".date");

window.onload = (data) => {
    renderData(getLocalStorage());
};

async function checkWeather(city){
    
    const response = await fetch(apiUrl + city); 
    
    if(response.status == 404){
        error.style.display = "block";
        weather.style.display = "none";
    } 
    else{
        let data = await response.json();
        renderData(data);
    }
}

function renderData(data){
    cityName.innerHTML = data.stacja;
    cityTemp.innerHTML = Math.round(data.temperatura) + "°C";
    cityPressure.innerHTML = Math.round(data.cisnienie) + " hPa";
    cityRainfall.innerHTML = data.suma_opadu + " mm";
    date.innerHTML = data.data_pomiaru; 

    weather.style.display = "block";
    error.style.display = "none";

    saveLocalStorage(data);
}

function citySelect(){
    const city  = fromEl.options[fromEl.selectedIndex].value
    return city;
}

searchBtn.addEventListener("click", ()=> {
    if(fromEl.options[fromEl.selectedIndex].value){
        checkWeather(citySelect());
    }else {
        error.style.display = "block";
        weather.style.display = "none";
    }
}
)
  
function saveLocalStorage(data) {
        localStorage.setItem('weather',JSON.stringify(data));
}
    
function getLocalStorage() {
        const data = JSON.parse(localStorage.getItem('weather'));
        return data;
}