var controlOpen = false;
var newMarkerModeOn = false;
var globalView = false;
var searchMode = false;

$(document).ready(function(){
  $(".wheel-button").wheelmenu({
    trigger: "click", // Can be "click" or "hover". Default: "click"
    animation: "fly", // Entrance animation. Can be "fade" or "fly". Default: "fade"
    animationSpeed: "fast", // Entrance animation speed. Can be "instant", "fast", "medium", or "slow". Default: "medium"
  });

  $(".wheel-button").on("click", function(){
    if(!controlOpen) {
      controlOpen = true;
    } else {
      controlOpen = false;
    }
  })

  $("[href='#right-menu']").on("click", function(){
    if(controlOpen){
      $(".wheel-button").trigger("click");
    };
    if(globalView){
      $("#global-view").trigger("click");
    }
  })
});

$(document).ready(function(){
  $("#new-marker-button").on("click", function(){
    if(!newMarkerModeOn){
      $(this).addClass("icon-glow");
      newMarkerMode();
      newMarkerModeOn = true;
    } else {
      endNewMarkerMode();
      $(this).removeClass("icon-glow");
      newMarkerModeOn = false;
    }
  })
});

$(document).ready(function(){
  $("#global-view").on("click", function(){
    if(!globalView){
      currentTags = [];
      $(this).addClass("icon-glow");
      updateMap();
      globalView = true;
    } else {
      $(this).removeClass("icon-glow");
      updateMapTags();
      globalView = false;
    }
  })
});

$(document).ready(function(){
  $("#search-button").on("click", function(){
    if(!searchMode){
      $(this).addClass("icon-glow");
      // trigger something
      searchMode = true;
    } else {
      // trigger something
      $(this).removeClass("icon-glow");
      searchMode = false;git co
    }
  })
});
