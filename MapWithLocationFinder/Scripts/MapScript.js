let map;
let marker;

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    map = new Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 10
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) {
    document.getElementById("location").innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
    var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    if (marker) {
        marker.setPosition(pos);
    } else {
        marker = new google.maps.Marker({
            position: pos,
            map: map
        });
    }
    map.setCenter(pos);
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}

$(document).ready(function () {
    $('#showLocationBtn').click(function () {
        getLocation();
    });
});