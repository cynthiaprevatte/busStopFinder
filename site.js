"use strict"

function ajaxCall(lat, long){
    
    /* ll	comma delimited long-lat pair (optional) - Defines center of search radius in decimal degrees.
    meters	number (optional)	Use with ll to define search radius in meters.
    appID	string (required)	Your appID received during registration.
    json	boolean (optional) "true" or "false" (default)	If true results will be returned in json format rather than the default xml format.
    
    desc:"SW Kelly & Corbett"
    dir:"Northbound"
    lat:45.5019212692922
    lng:-122.675276776225
    locid:3116
    */
    
    $.ajax({
        url: 'https://developer.trimet.org/ws/V1/stops',
        method: 'GET',
        data: {'ll': `${lat},${long}`, 'meters': 100, 'appID': 'C6B4B53B18C1975C5C6375A88', 'json': 'true'},
        success: function(response){
            console.log(response);
            parseTheResponse(response);
        },
        error:function(err){
            console.log(err);
        }
    });
}

function makeMarker(uluru, map) {
    let marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}

function initMap(lat, long) {
    
    let uluru = {lat: lat, lng: long};
    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 17,
        center: uluru
    });

    makeMarker(uluru, map);
    ajaxCall(lat, long);
}

function parseTheResponse(){
    
}

function getLocation() {

    navigator.geolocation.getCurrentPosition(function(position) {
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        initMap(lat, long);
    });
}
