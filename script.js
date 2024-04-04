let model = {
    longitude: null,
    latitude: null,
    currentTemp: undefined,
    data: undefined,
    date: {
        raw: null,
        localformat: null,
        yrformat: null,
        yrformatone: null,
        yrformattwo: null,
        yrformatthree: null,
        yrformatsix: null,
        year: null,
        month: null,
        day: null,
        hour: null,
        hourone: null,
        hourtwo: null,
        hourthree: null,
        hoursix: null,
    },
    temp: {
        now: null,
        onehour: null,
        twohour: null,
        threehour: null,
        sixhour: null,
    }
}

const app = document.getElementById("app");


//henter ut brukeren sin lokasjon og sjekker etter error
const successCallback = (position) => {
    model.latitude = position.coords.latitude.toFixed(2);
    model.longitude = position.coords.longitude.toFixed(2);
    getCurrentTemp();
    console.log(model)
}
const errorCallback = (error) => {
    console.error(error);
}
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);


//Bruker bruker informasjon til å hente data fra YR sin API
async function getCurrentTemp() {
    try{
        const response = await fetch(`https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=${model.latitude}&lon=${model.longitude}`)
        
        if (!response.ok){
            throw new Error("Could not get resource");
        }

        model.data = await response.json();
        model.currentTemp = model.data.properties.timeseries[0].data.instant.details.air_temperature;

        getDate();

    } catch(error) {
        console.error(error);
}
}

function updateView() {
    app.innerHTML = /*HTML*/`
        <div id="container">
            <h3 class="dato">${model.date.localformat}</h3>
            <div class="tempnow">
                <h3 class="currenttemp">${model.date.hour}:00 | ${model.temp.now.data.instant.details.air_temperature} ℃</h3> 
                <img class="currentpic" src="png/${model.temp.now.data.next_1_hours.summary.symbol_code}.png">
            </div>
            <div class="futuretemp">
                <div>
                    <h3>${model.date.hourone}:00 | ${model.temp.onehour.data.instant.details.air_temperature} ℃</h3>
                    <img src="png/${model.temp.onehour.data.next_1_hours.summary.symbol_code}.png">
                </div>
                <div>
                    <h3>${model.date.hourtwo}:00 | ${model.temp.twohour.data.instant.details.air_temperature} ℃</h3>
                    <img src="png/${model.temp.twohour.data.next_1_hours.summary.symbol_code}.png">
                </div>
                <div>
                    <h3>${model.date.hourthree}:00 | ${model.temp.threehour.data.instant.details.air_temperature} ℃</h3>
                    <img src="png/${model.temp.threehour.data.next_1_hours.summary.symbol_code}.png">
                </div>
                <div>
                    <h3>${model.date.hoursix}:00 | ${model.temp.sixhour.data.instant.details.air_temperature} ℃</h3>
                    <img src="png/${model.temp.sixhour.data.next_1_hours.summary.symbol_code}.png">
                </div>
            </div>
            
        </div>
    `
}



function getDate() {
    model.date.raw = new Date();
    model.date.localformat = model.date.raw.toLocaleDateString();
    model.date.year = model.date.raw.getFullYear();
    model.date.month = model.date.raw.getMonth() + 1;
    model.date.day = model.date.raw.getDay();
    model.date.hour = model.date.raw.getHours();
    model.date.hourone = model.date.hour + 1;
    model.date.hourtwo = model.date.hour + 2;
    model.date.hourthree = model.date.hour + 3;
    model.date.hoursix = model.date.hour + 6;
    addZeros();

    model.date.yrformat = model.date.year + '-' + model.date.month + '-' + model.date.day + 'T' + model.date.hour + ':00:00Z'
    model.date.yrformatone = model.date.year + '-' + model.date.month + '-' + model.date.day + 'T' + model.date.hourone + ':00:00Z'
    model.date.yrformattwo = model.date.year + '-' + model.date.month + '-' + model.date.day + 'T' + model.date.hourtwo + ':00:00Z'
    model.date.yrformatthree = model.date.year + '-' + model.date.month + '-' + model.date.day + 'T' + model.date.hourthree + ':00:00Z'
    model.date.yrformatsix = model.date.year + '-' + model.date.month + '-' + model.date.day + 'T' + model.date.hoursix + ':00:00Z'
    console.log(model)
    findTemperatures();
    updateView();
}

function addZeros() {
    if (model.date.month < 10) {
        model.date.month = "0" + model.date.month;
    }

    if (model.date.day < 10) {
        model.date.day = "0" + model.date.day;
    }
    if (model.date.hour < 10) {
        model.date.hour = "0" + model.date.hour;
    }
}

function findTemperatures() {
    model.temp.now = model.data.properties.timeseries.find((weather) => weather.time == model.date.yrformat);
    model.temp.onehour = model.data.properties.timeseries.find((weather) => weather.time == model.date.yrformatone);
    model.temp.twohour = model.data.properties.timeseries.find((weather) => weather.time == model.date.yrformattwo);
    model.temp.threehour = model.data.properties.timeseries.find((weather) => weather.time == model.date.yrformatthree);
    model.temp.sixhour = model.data.properties.timeseries.find((weather) => weather.time == model.date.yrformatsix);
}




