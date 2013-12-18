var currentTags = [];
var activeCollection;
var $menu = $('#right-menu');
var menuOptions = {
      classes: "mm-dark"
    };

$(document).ready(function(){
  loadMenu();
});

var loadMenu = function(){
  // Load mmenu
  $menu.mmenu(menuOptions);

  //Triggered when a collection is set
  $(".collection-eye").on('click', function(){
    // Go through each collection and hide it and its tags
    $(".collection-eye").each( function(){
      $(this).parent().parent().attr("data-show", "disabled");
      $(this).removeClass("fa-eye").addClass("fa-eye-slash");
      $(this).children().each(function(){
        $(this).parent().parent().attr("data-show", "disabled");
        $(this).removeClass("fa-eye").addClass("fa-eye-slash");
      });
      // This selects the unique href of the clicked on collection
      var href = $(this).parent().parent().children().first().attr("href")
      // Set all collections to be inactive
      $(href).find("li").first().parent().attr("data-active", "false")
      $(href).find("li").not($(".mm-subclose")).each(function(){
        $(this).find(".tag-eye").each(function(){
          $(this).parent().parent().attr("data-show", "disabled");
          $(this).removeClass("fa-eye").addClass("fa-eye-slash");
        })
      })
    })
    // Go into the clicked on collection list and make visible all its tags
    var href = $(this).parent().parent().children().first().attr("href");
    // Set specific collection to be active
    $(href).find("li").first().parent().attr("data-active", "true")
    $(href).find("li").not($(".mm-subtitle")).each(function(){
      if($(this).attr("data-show") != undefined) {
        $(this).attr("data-show", "enabled");
        $(this).find(".fa-eye-slash").removeClass("fa-eye-slash").addClass("fa-eye");
        activeCollection = href
      }
    })
    // Make this collection visible
    $(this).toggleClass("fa-eye fa-eye-slash");
    $(this).parent().parent().attr("data-show","enabled");
    var element = $(this).parent().parent()
    setCollectionTags(element);
  });

  // Individual tags within collections can all be visible or hidden
  $(".tag-eye").on('click', function(){
    console.log("tag-eye clicked")
    var current_collection = "#" + $(this).parent().parent().parent().attr("id")
    if(current_collection == activeCollection){
      $(this).toggleClass("fa-eye fa-eye-slash");
    $(this).parent().parent().attr("data-show", $(this).parent().parent().attr("data-show") == "disabled" ? "enabled" : "disabled");
    }
    var element = $(this).parent().parent();
    updateMapTags();
  })
  // Bind slide toggle to new collection button to show form.
  $("#new-collection").on("click", function(){
    $("#collection-form").slideToggle(400);
  });
  // Bind slide toggle to new tag button to show form
  $(".new-tag").on("click", function() {
    $(this).prev(".tag-form").slideToggle(400);
  });
};

// Used to set the collection of current tags
var setCollectionTags = function(element){
  if( $(element).attr("data-show") == "enabled"){
    updateMapTags();
  }
};

// Update current tags
var updateMapTags = function() {
  currentTags = []
  $("#right-menu").children().each(function(){
    $(this).children().each(function(){
      if ($(this).attr("data-tag") !== undefined && $(this).attr("data-show") == "enabled") {
      currentTags.push($(this).attr("data-tag"))
      }
    })
  })
  removeAllMarkers();
  updateMap();
};

var loadCollection = function(collection){
  $menu.remove();
  loadMenu();
  disableLastCreatedCollection(collection);
  $("#collection-form").slideUp(400, function(){
    $("[data-collection = '" + collection + "'] ").slideDown(400, function(){
      $(this).siblings("#collection-form").find("form")[0].reset()
    });
  });
}

var disableLastCreatedCollection = function(newCollection){
  var lastCollection = $("[data-collection = '" + newCollection + "'] ").prev();
  $(lastCollection).attr("data-show", "false");
  debugger
  $(lastCollection).find("i").removeClass("fa-eye").addClass("fa-eye-slash");
}

var loadTag = function(tag) {
  $menu.remove();
  loadMenu();
  $("[data-tag = '" + tag + "']").slideDown(400, function(){
    $(this).siblings(".tag-form").find("form")[0].reset()
  })
}