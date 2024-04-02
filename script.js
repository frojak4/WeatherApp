let model = {
    longitude: null,
    latitude: null,
    yrdata: undefined,
}



const successCallback = (position) => {
    model.latitude = position.coords.latitude;
    model.longitude = position.coords.longitude;
    console.log(model)
}

const errorCallback = (error) => {
    console.error(error);
}
navigator.geolocation.getCurrentPosition(successCallback, errorCallback);

const weatherData = await getWeather();

console.log(weatherData);

async function getWeather() {

    const apiUrl = `https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=60.10&lon=9.58`
    const response = await fetch(apiUrl)

    console.log(response);
    return await response.json();
}

