var currentTags = [];
var activeCollection;
var $menu = $('#right-menu');
var menuOptions = {};

$(document).ready(function(){
  // Load mmenu
  $menu.mmenu(menuOptions);
  
  //Only one collection at a time is set to visible 
  $(".collection-eye").on('click', function(){
    // Go through each collection and hide it
    $(".collection-eye").each( function(){
      $(this).parent().parent().attr("data-show", "disabled");
      $(this).removeClass("fa-eye").addClass("fa-eye-slash");
      $(this).children().each(function(){
        $(this).parent().parent().attr("data-show", "disabled");
        $(this).removeClass("fa-eye").addClass("fa-eye-slash");
      });
      // Go into each collection and hide all its tags
      var href = $(this).parent().parent().children().first().attr("href")
      // Set specific collection to be active
      $(href).find("li").first().parent().attr("data-active", "false")
      $(href).find("li").not($(".mm-subclose")).each(function(){
        $(this).find(".tag-eye").each(function(){
          $(this).parent().parent().attr("data-show", "disabled");
          $(this).removeClass("fa-eye").addClass("fa-eye-slash");
        })
      })
    })
    // Go into the collections list and make visible all its tags
    var href = $(this).parent().parent().children().first().attr("href");
    // Set specific collection to be active
    $(href).find("li").first().parent().attr("data-active", "true")
    $(href).find("li").not($(".mm-subtitle")).each(function(){
      $(this).find(".tag-eye").each(function(){
        $(this).parent().parent().attr("data-show", "enabled");
        $(this).removeClass("fa-eye-slash").addClass("fa-eye");
        activeCollection = href
      })
    })
    // Make this collection visible
    $(this).toggleClass("fa-eye fa-eye-slash");
    $(this).parent().parent().attr("data-show","enabled");
    var element = $(this).parent().parent()
    setCollectionTags(element);
  });

  // Individual tags within collections can all be visible or hidden
  $(".tag-eye").on('click', function(){
    var current_collection = "#" + $(this).parent().parent().parent().attr("id")
    if(current_collection == activeCollection){
      $(this).toggleClass("fa-eye fa-eye-slash");
    $(this).parent().parent().attr("data-show", $(this).parent().parent().attr("data-show") == "disabled" ? "enabled" : "disabled");
    }
    var element = $(this).parent().parent();
    updateTags();
  })
});

// Used to set the collection of current tags
var setCollectionTags = function(element){
  if( $(element).attr("data-show") == "enabled"){
    updateTags();
  }
};

// Update current tags
var updateTags = function() {
  tags = []
  $("#right-menu").children().each(function(){
    $(this).children().each(function(){
      if ($(this).attr("data-tag") !== undefined && $(this).attr("data-show") == "enabled") {
      tags.push($(this).attr("data-tag"))
      }
    })
  })
};