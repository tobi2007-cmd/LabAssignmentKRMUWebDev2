const search = document.querySelector("#searchBtn")
const input = document.querySelector("#searchBox")
const history = document.querySelector("#historyList")
const city = document.querySelector("#cityValue")
const temp = document.querySelector("#temperature")
const humidity = document.querySelector("#humidity")
const windSpeed = document.querySelector("#windSpeed")
const pressure = document.querySelector("#pressure")
const precipitation = document.querySelector("#precipitation")

let cityNameList = JSON.parse(localStorage.getItem("cityNameList")) || [];

cityNameList.forEach(city => {
    historyList(city);
});

search.addEventListener("click", () => {

    let cityName = input.value.trim();

    if (cityName === ""){
        alert("Please enter a city name");
        return;
    }

    cityName = cityName.toLowerCase();
    const lastCity = cityNameList[cityNameList.length - 1];

    if (lastCity !== cityName){

        cityNameList.push(cityName);
        localStorage.setItem("cityNameList", JSON.stringify(cityNameList));
        cityNameList = JSON.parse(localStorage.getItem("cityNameList"));
        historyList(cityName);

    }

    apiCall(cityName);
    input.value = "";

})

function historyList(cityName){
    const listItem = document.createElement("div");
    listItem.setAttribute("class", "listItem");
    listItem.innerHTML = cityName;
    history.appendChild(listItem);
    listItem.addEventListener("click", ()=>{
        input.value = listItem.innerText
    })

}

function apiCall(cityName){
    api = "https://api.weatherapi.com/v1/current.json?key=5a2e90b65af04c8e9d682732262402&q=city&aqi=no"
    fetch(api.replace("city",cityName))
    .then(res => res.json())
    .then(data => {

        city.innerHTML = cityName;
        temp.innerHTML = data.current.temp_c + "°C";
        humidity.innerHTML = data.current.humidity + "%";
        windSpeed.innerHTML = data.current.wind_kph + " kph";
        pressure.innerHTML = data.current.pressure_mb + " mb";
        precipitation.innerHTML = data.current.precip_mm + " mm";
        
    })
    .catch(err => console.error(err));
}



