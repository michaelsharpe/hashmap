var tags = []

$(document).ready(function(){
  // Load mmenu
  $("#right-menu").mmenu({
  });
  //Only one collection at a time is set to visible 
  $(".collection-eye").on('click', function(){
    // Go through each collection and hide it
    $(".collection-eye").each( function(){
      $(this).attr("data-show", "disabled");
      $(this).removeClass("fa-eye").addClass("fa-eye-slash");
      $(this).children().each(function(){
        $(this).attr("data-show", "disabled");
        $(this).removeClass("fa-eye").addClass("fa-eye-slash");
      });
      var href = $(this).parent().parent().children().first().attr("href")
      $(href).find("li").not($(".mm-subclose")).each(function(){
        $(this).find(".tag-eye").each(function(){
          $(this).attr("data-show", "disabled");
          $(this).removeClass("fa-eye").addClass("fa-eye-slash");
        })
      })
    })
    // Go into the collections list and make visible all its tags
    var href = $(this).parent().parent().children().first().attr("href");
    $(href).find("li").not($(".mm-subtitle")).each(function(){
      $(this).find(".tag-eye").each(function(){
        $(this).attr("data-show", "enabled");
        $(this).removeClass("fa-eye-slash").addClass("fa-eye");
      })
      
    })
    $(this).toggleClass("fa-eye fa-eye-slash");
    $(this).attr("data-show","enabled");
    $(this).children().each(function(){
      $(this).attr("data-show", "enabled");
      $(this).removeClass("fa-eye-slash").addClass("fa-eye");
    })
  });
  // Individual tags within collections can all be visible or hidden
  $(".tag-eye").on('click', function(){
    $(this).toggleClass("fa-eye fa-eye-slash");
    $(this).attr("data-show", $(this).attr("data-show") == "disabled" ? "enabled" : "disabled");
  })
  // Iterate through each tag in a collection list and load only those markers.

});