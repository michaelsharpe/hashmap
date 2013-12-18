var controlOpen = false;

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
    }
  })
});

