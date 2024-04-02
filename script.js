let model = {
    longitude: null,
    latitude: null,
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