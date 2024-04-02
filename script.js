let model = {
    longitude: null,
    latitude: null,
    currentTemp: undefined,
    data: undefined,
}



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
        model.currentTemp = model.data.properties.timeseries[0].data.instant.details.air_temperature

    } catch(error) {
        console.error(error);
}
}

