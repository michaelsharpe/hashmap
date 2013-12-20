$(document).ready(function(){
  // if (!($("#blank_iframe")){
    initMapProcedure();
  // }
});

var map;
var mapCenter;
var currentPositionMarker;
var positionTimer;
var markers = new Array();
var geocoder;
var tempMarker;

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
    geocoder = new google.maps.Geocoder();
    initializeMap(position);
    updateMap();
    watchCurrentPosition();
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

function watchCurrentPosition(){
  positionTimer = navigator.geolocation.watchPosition(watchSuccess, watchError, watchOptions)
}

function watchSuccess(position){
  setMarkerPosition(currentPositionMarker, position);
}

function watchError(err){
  console.warn('ERROR(' + err.code + '): ' + err.message);
}

var watchOptions = {
  enableHighAccuracy: true,
  timeout: Infinity,
  maximumAge: Infinity
}

function setMarkerPosition(marker, position) {
  var latLng = L.latLng(position.coords.latitude, position.coords.longitude);
  marker.setLatLng(latLng);
  map.panTo(latLng);
}

function disableMap(){
  map.dragging.disable();
  map.touchZoom.disable();
  map.doubleClickZoom.disable();
  map.scrollWheelZoom.disable();
  map.boxZoom.disable();
  map.keyboard.disable();
}

function enableMap(){
  map.dragging.enable();
  map.touchZoom.enable();
  map.doubleClickZoom.enable();
  map.scrollWheelZoom.enable();
  map.boxZoom.enable();
  map.keyboard.enable();
}

function newMarkerMode(){
  tempMarker = L.marker(map.getCenter(), {
    draggable: true
  });
  tempMarker.bindPopup("<h6>Drag me where you want me, then push the button!</h6>").addTo(map);
  tempMarker.openPopup();
  toggleGeocoder();
  for(var i = 0; i < markers.length; i++){
    if (markers[i]){
      markers[i].setOpacity(0.5);
    }
  }
  $(".form-container").append("<div id='newMarkerButton'>Mark it</div>");
  $("#newMarkerButton").on("click", function(){
    $(this).remove();
    tempMarker.dragging.disable();
    tempMarker.unbindPopup();
    var lat = tempMarker.getLatLng().lat;
    var lng = tempMarker.getLatLng().lng;
    disableMap();
    getGeomarkerForm(lat, lng);
  });
}

function endNewMarkerMode(){
  $("#newMarkerButton").remove();
  map.removeLayer(tempMarker);
  tempMarker = undefined;
  for (var i = 0; i < markers.length; i++){
    if (markers[i]){
      markers[i].setOpacity(1);
    }
  }
  toggleGeocoder();
}

function toggleGeocoder(){
  if($("#addressSearch").length > 0){
    $("#addressSearch").remove();
  } else {
    $("#map").append('<div id="addressSearch"><input id="address" type="textbox" value="Bermuda Triangle"><input id="addressLookup" type="button" value="Encode"></div>');
    $("#addressLookup").on("click", moveToAddress);
  }
}

function moveToAddress(){
  var address = $("#address").val();
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var center = L.latLng(results[0].geometry.location.lat(),results[0].geometry.location.lng());
      map.panTo(center);
      if(tempMarker){
        tempMarker.setLatLng(center);
      }
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

function getGeomarkerForm(lat, lng){
  $.ajax({
    type: "GET",
    url: "/geomarkers/new",
    dataType: "script",
    data: { geomarker: {
      latitude: lat,
      longitude: lng
    }}    
  });
}

function quitGeomarkerForm(){
  $(".geomarker-form").remove();
  if (newMarkerModeOn) {
    endNewMarkerMode();
  }
}

function removeIFrame(){
  $("#blank_iframe").remove();
}

function getGeomarkerShow(id){
  var windowWidth = $(window).width() / parseFloat($("body").css("font-size"));
  $.ajax({
    type: "GET",
    url: "/geomarkers/" + id,
    dataType: "script",
    data: { windowWidth: windowWidth }
  });
}

function getLastGeomarkerCreatedByUser(){
  $.ajax({
    type: "GET",
    url: "/geomarkers/show",
    dataType: "script",
    data: { newMarker: true }
  });
}

function removeGeomarkerShow(){
  $(".geomarker-show").remove();
}

function getGeomarkerEdit(id){
  $.ajax({
    type: "GET",
    url: "/geomarkers/" + id + "/edit",
    dataType: "script"
  });
}

function deleteGeomarker(id){
  $.ajax({
    type: "DELETE",
    url: "/geomarkers/" + id,
    dataType: "script"
  }).done(function(transport){
    removeMarker(id);
  });
}

function changeFocus(latlng, zoom){
  map.panTo(latlng);
  map.setZoom(zoom);
}



function updateMap() {
  var tags = currentTags.join(', ')
  var bounds = map.getBounds()
  var southWest = bounds._southWest.lat + "," + bounds._southWest.lng
  var northEast = bounds._northEast.lat + "," + bounds._northEast.lng
  $.ajax({
    url: "geomarkers",
    type: "GET",
    dataType: "json",
    data: {sw:southWest, ne: northEast, tags: tags}
  }).done( function(transport){
    var markersJSON = transport;
    if(markers.length > 0) {
      removeMarkersOutsideOfMapBounds();
    }
    for (var i=0; i < markersJSON.length; i++){
      var marker = markersJSON[i];
      var id = marker.id;
      if (!markers[id] || markers[id] == null) {
        markers[id] = makeMarker(marker);
      }
    }
  })
}

function removeAllMarkers() {
  for(i in markers) {
    if(i > 0 && markers[i]) {
      map.removeLayer(markers[i]);
      markers[i] = null;
    }
  }
}

function removeMarkersOutsideOfMapBounds() {
  for(i in markers) {
    if(i > 0 && markers[i] && !map.getBounds().contains(markers[i].getLatLng())) {
      map.removeLayer(markers[i]);
      markers[i] = null;
    }
  }
}

function makeMarker(markerJSON){
  var latlng = L.latLng(markerJSON.latitude, markerJSON.longitude);
  var marker = L.marker(latlng,{title: markerJSON.name});
  var imgURL = "";
  if (markerJSON.image.thumb) {
    imgURL = "<img class='th' src='" + markerJSON.image.thumb + "' />";
  } else {
    imgURL = "<p>No image attached</p>";
  }
  marker.bindPopup("<div class='marker-popup' data-id='" + markerJSON.id + "'><p>Name: " + markerJSON.name + "</p><p>Tags: " + markerJSON.tag_list + "</p><br>" + imgURL + "</div>");
  marker.addTo(map);
  marker.on("popupopen", function(){
    $(".marker-popup").on("click", function(){
      var id = $(".marker-popup").attr("data-id");
      getGeomarkerShow(id);
      disableMap();
      marker.closePopup();
    });
  });
  if (newMarkerModeOn) {
    marker.setOpacity(0.5);
  }
  return marker
}

function removeMarker(id){
  map.removeLayer(markers[id]);
  markers[id] = null;
}