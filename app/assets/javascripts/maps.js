$(document).ready(function(){
  initMapProcedure();
});

var map;
var mapCenter;
var currentPositionMarker;
var positionTimer;
var markers = new Array();
var geocoder;
var tempMarker;
var newMode = false;

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
    setButtonListeners();
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

function setButtonListeners(){
  $("#newMarkerButton").on("click", newMarkerMode);
}

function newMarkerMode(){
  $("#newMarkerButton").off("click", newMarkerMode);
  $("#newMarkerButton").val("Cancel");
  $("#newMarkerButton").on("click", endNewMarkerMode);
  tempMarker = L.marker(map.getCenter(), {
    draggable: true
  });
  tempMarker.bindPopup("<h6>Drag me where you want me, or enter an address up top!</h6>").addTo(map);
  toggleGeocoder();
  newMode = true;
  for(var i = 0; i < markers.length; i++){
    if (markers[i]){
      markers[i].setOpacity(0.5);
    }
  }
  tempMarker.addEventListener("dblclick", function(){
    tempMarker.dragging.disable();
    tempMarker.unbindPopup();
    var lat = tempMarker.getLatLng().lat;
    var lng = tempMarker.getLatLng().lng;
    getGeomarkerForm(lat, lng);
  });
}

function endNewMarkerMode(){
  $("#newMarkerButton").off("click", endNewMarkerMode);
  $("#newMarkerButton").val("point and click");
  $("#newMarkerButton").on("click", newMarkerMode);
  map.removeLayer(tempMarker);
  tempMarker = undefined;
  newMode = false;
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
  $("#geomarker-form").remove();
  endNewMarkerMode();
}

function changeFocus(lat, lng, zoom){
  var latlng = L.latLng(lat, lng);
  map.panTo(latlng);
  map.setZoom(zoom);
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
  var marker = L.marker(latlng,{title: markerJSON.name});
  marker.addTo(map);
  if (newMode) {
    marker.setOpacity(0.5);
  }
  return marker;
}

// Simulating asynchronous file upload
function fileUpload(form, action_url, div_id) {
  // Create the iframe...
  var iframe = document.createElement("iframe");
  iframe.setAttribute("id", "upload_iframe");
  iframe.setAttribute("name", "upload_iframe");
  iframe.setAttribute("width", "0");
  iframe.setAttribute("height", "0");
  iframe.setAttribute("border", "0");
  iframe.setAttribute("style", "width: 0; height: 0; border: none;");

  // Add to document...
  form.parentNode.appendChild(iframe);
  window.frames['upload_iframe'].name = "upload_iframe";

  iframeId = document.getElementById("upload_iframe");

  // Add event...
  var eventHandler = function () {

          if (iframeId.detachEvent) iframeId.detachEvent("onload", eventHandler);
          else iframeId.removeEventListener("load", eventHandler, false);

          // Message from server...
          if (iframeId.contentDocument) {
              content = iframeId.contentDocument.body.innerHTML;
          } else if (iframeId.contentWindow) {
              content = iframeId.contentWindow.document.body.innerHTML;
          } else if (iframeId.document) {
              content = iframeId.document.body.innerHTML;
          }

          document.getElementById(div_id).innerHTML = content;

          // Del the iframe...
          setTimeout('iframeId.parentNode.removeChild(iframeId)', 250);
      }

  if (iframeId.addEventListener) iframeId.addEventListener("load", eventHandler, true);
  if (iframeId.attachEvent) iframeId.attachEvent("onload", eventHandler);

  // Set properties of form...
  form.setAttribute("target", "upload_iframe");
  form.setAttribute("action", action_url);
  form.setAttribute("method", "post");
  form.setAttribute("enctype", "multipart/form-data");
  form.setAttribute("encoding", "multipart/form-data");

  // Submit the form...
  form.submit();

  document.getElementById(div_id).innerHTML = "Uploading...";
}