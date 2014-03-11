$(document).ready(function(){
    initMapProcedure();
});

var map;
var mapCenter;
var cluster = new L.MarkerClusterGroup();
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
    $("#addressLookup").on("click", moveToAddress);
    initializeMap(position);
    updateMap();
    watchCurrentPosition();
    // map.on('moveend', updateMap);
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
  L.tileLayer('http://{s}.tile.cloudmade.com/970dced6767041b0ad54c73f2cde97ba/116912@2x/256/{z}/{x}/{y}.png', {
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
  // Make temporary marker
  tempMarker = L.marker(map.getCenter(), {
    draggable: true
  });
  tempMarker.bindPopup("<h6>Drag me where you want me, then push the button!</h6>").addTo(map);
  tempMarker.openPopup();
  
  // Set transparency of existing markers
  map.on('moveend', function(){
    cluster.eachLayer(function(marker){
      marker.setOpacity(0.5);
    });
  });
  map.fireEvent('moveend');

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
  if(newMarkerModeOn){
    $("#newMarkerButton").remove();
    map.removeLayer(tempMarker);
    tempMarker = undefined;
    map.off('moveend');
    cluster.eachLayer(function(marker){
      marker.setOpacity(1);
    });
  }
}

function toggleGeocoder(){
  $(".geocoder-bar").slideToggle("slow");
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

function removeIFrame(){
  if ($("#blank_iframe")) {
    $("#blank_iframe").remove();
  }
}

function extractIFrameErrors(){
  var rawErrors;
  var errors;
  var iframeId = $("#blank_iframe");
  if (iframeId.contents().find(".error_messages").html()) {
    errors = "<h4>Form is invalid</h4>";
    rawErrors = iframeId.contents().find(".error_messages").html();

    if (rawErrors.search("Name can't") != -1) {
      errors = errors + "<p>Your geomarker must have a name.</p>"
    }

    if (rawErrors.search("Tag list can't") != -1) {
      errors = errors + "<p>Please add at least one tag to your geomarker.</p><p>Tags are written as a comma separated list (eg. subway, bus stop, last remaining pay phone)</p>"
    }

    if (rawErrors.search("Image Failed") != -1) {
      errors = errors + "<h6>The file you've attached must not be an image.</h6><p>Please select an image file to upload, or create this geomarker without one. You can always attach one later.</p><p>Acceptable file formats are: jpg, jpeg, gif, and png</p>"
    }
  }
  return errors;
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

function getNewMarker(){
  $.ajax({
    type: "GET",
    url: "/geomarkers/show",
    dataType: "json",
    data: { newMarker: true }
  }).done(function(transport){
    getGeomarkerShow(transport.id);
    markers[transport.id] = makeMarker(transport);
  });
}

function clearViews(){
  removeGeomarkerShow();
  removeGeomarkerForm();
  removeUserProfile();
  removeIFrame();
  endNewMarkerMode();
}

function removeGeomarkerShow(){
  if ($(".geomarker-show")) {  
    $(".geomarker-show").remove();
  }
}

function removeGeomarkerForm(){
  if ($(".geomarker-form")) {
    $(".geomarker-form").remove();
  }
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
  });
}

function deleteComment(geomarkerID, commentID){
  $.ajax({
    type: "DELETE",
    url: "/geomarkers/" + geomarkerID + "/comments/" + commentID,
    dataType: "script"
  });
}

function addNewTags(geomarkerID){
  var tags = $("#new-geomarker-tags").val();
  $.ajax({
    type: "PATCH",
    url: "/geomarkers/" + geomarkerID,
    dataType: "script",
    data: { geomarker: {
      new_tags: tags }}
  });
}

function changeFocus(latlng, zoom){
  map.panTo(latlng);
  map.setZoom(zoom);
}

function updateMap() {
  var tags = currentTags.join(', ')
  $.ajax({
    url: "geomarkers",
    type: "GET",
    dataType: "json",
    data: {
      tags: tags}
  }).done( function(transport){
    cluster.clearLayers();
    for (var i=0; i < transport.length; i++){
      var id = transport[i].id;
      markers[id] = makeMarker(transport[i]);
    }
    map.addLayer(cluster);
  })
}

function updateMarker(id){
  $.ajax({
    url: "geomarkers/" + id,
    type: "GET",
    dataType: "json"
  }).done(function(transport){
    markers[id] = makeMarker(transport);
  });
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
  cluster.addLayer(marker);
  // marker.addTo(map);
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
  cluster.removeLayer(markers[id]);
}