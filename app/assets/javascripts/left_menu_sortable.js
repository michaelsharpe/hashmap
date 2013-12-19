var removeIntent = false;

$(document).ready(function(){
  $(".sortable").sortable({
    placeholder: "sortable-placeholder",
    items: "> li.sortable-active",
    cursor: "move",
    opacity: 1,
    axis: "y",
    over: function(){
      removeIntent = false;
    },
    out: function(){
      removeIntent = true;
    },
    beforeStop: function(){
      if(removeIntent){
        ui.item.remove()
      }
    },
  });

});