var map;
var mapCenter;
var currentPositionMarker;
var positionTimer;
var markers = new Array();

function initMapProcedure(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(mapController, locError);
  } else {
    alert("Get a better browser!");
  }
}
function locError(error) {
  alert("The current position could not be found!");
}

// Use Map Controller to add in functional flows that need access to current position

function mapController(position){
    initializeMap(position);
    updateMap();
    map.on('moveend', updateMap);
}

function initializeMap(position){
  var latLng = L.latLng(position.coords.latitude, position.coords.longitude);
  var mapOptions= {
    zoom: 18,
    minZoom: 3,
    center: latLng
  };

  // Generate new map centered on current position
  map = L.map("map", mapOptions);
  L.tileLayer('http://{s}.tile.cloudmade.com/970dced6767041b0ad54c73f2cde97ba/116201@2x/256/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
  }).addTo(map);
  currentPositionMarker = L.marker(latLng).addTo(map);
}

function loadMarkers(){
  $.ajax({
    url: "geomarkers.json",
    context: map,
  }).done(function(markers){
    for(var i=0; i < markers.length; i++) {
      makeMarker(markers[i].latitude, markers[i].longitude, markers[i])
    }
  })
}

function updateMap() {
  var bounds = map.getBounds()
  var southWest = bounds._southWest.lat + "," + bounds._southWest.lng
  var northEast = bounds._northEast.lat + "," + bounds._northEast.lng

  $.ajax({
    url: "geomarkers.js",
    type: "GET",
    data: {sw:southWest, ne: northEast}, 
  }).done( function(transport){
    var markersJSON = $.parseJSON(transport);
    if(markers.length > 0) {
      removeMarkersOutsideOfMapBounds();
    }
    for (var i=0; i < markersJSON.length; i++){
      var marker = markersJSON[i];
      var id = marker.id;
      var lat = marker.latitude;
      var lng = marker.longitude;
      if (!markers[id] || markers[id] == null) {
        markers[id] = makeMarker(lat, lng, marker);
      }
    }
  })
}

function removeMarkersOutsideOfMapBounds() {
  for(i in markers) {
    if(i > 0 && markers[i] && !map.getBounds().contains(markers[i].getLatLng())) {
      map.removeLayer(markers[i]);
      markers[i] = null;
    }
  }
}

function makeMarker(lat, lng, markerJSON){
  var latlng = L.latLng(lat, lng);
  var marker = L.marker(latlng,{title: markerJSON.name}).addTo(map);
}

$(document).ready(function(){
  initMapProcedure();

});