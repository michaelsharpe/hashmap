var currentTags = [];
var activeCollection;
var $menu = $('#left-menu');
var menuOptions = {
      classes: "mm-dark"
    };

$(document).ready(function(){
  loadMenu();
});

function loadMenu(){
  // Load mmenu
  $menu.mmenu(menuOptions);
  activateSortable();

  //Triggered when a collection is set
  $(".collection").on('click', function(){
    // Go through each collection and hide it and its tags
    $(".collection-eye").each( function(){
      $(this).parent().parent().attr("data-show", "disabled");
      $(this).removeClass("fa-eye").addClass("fa-eye-slash");
      $(this).removeClass("icon-glow")
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
    var href = $(this).children().first().attr("href");
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
    $(this).find(".collection-eye").toggleClass("fa-eye fa-eye-slash");
    $(this).find(".collection-eye").addClass("icon-glow");
    $(this).find(".collection-eye").parent().parent().attr("data-show","enabled");
    var element = $(this)
    setCollectionTags(element);
  });

  // Individual tags within collections can all be visible or hidden
  $(".tag").on('click', function(){
    console.log("tag-eye clicked")
    var current_collection = "#" + $(this).parent().attr("id");
    if(current_collection == activeCollection){
      $(this).find(".tag-eye").toggleClass("fa-eye fa-eye-slash");
    $(this).attr("data-show", $(this).attr("data-show") == "disabled" ? "enabled" : "disabled");
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
function setCollectionTags(element){
  if( $(element).attr("data-show") == "enabled"){
    updateMapTags();
  }
};

// Update current tags
function updateMapTags() {
  currentTags = [];
  $("#left-menu").children().each(function(){
    $(this).children().each(function(){
      if ($(this).attr("data-tag") !== undefined && $(this).attr("data-show") == "enabled") {
      currentTags.push($(this).attr("data-tag"))
      }
    })
  })
  removeAllMarkers();
  updateMap();
};

// Load a collection
function loadCollection(collection){
  $menu.remove();
  loadMenu();
  disableLastCreatedCollection(collection);
  $("#collection-form").slideUp(400, function(){
    $("[data-collection = '" + collection + "'] ").slideDown(400, function(){
      $(this).siblings("#collection-form").find("form")[0].reset()
    });
  });
  activateSortable();
}

// Whena  new collection is created, the last created one is turned off.
function disableLastCreatedCollection(newCollection){
  var lastCollection = $("[data-collection = '" + newCollection + "'] ").prev();
  $(lastCollection).attr("data-show", "false");
  $(lastCollection).find("i").removeClass("fa-eye").addClass("fa-eye-slash");
}

function loadTag(tag) {
  $menu.remove();
  loadMenu();
  $("[data-tag = '" + tag + "']").slideDown(400, function(){
    $(this).siblings(".tag-form").find("form")[0].reset()
  })
}

// Control flow for left menu button
$(document).ready(function(){
  $("#open-menu").on("click", function(){
    if(controlOpen){
      $(".wheel-button").trigger("click");
      setTimeout(function(){
        $($menu).trigger("open");
      }, 800)
    } else {
      $($menu).trigger("open");
    }
  })
});