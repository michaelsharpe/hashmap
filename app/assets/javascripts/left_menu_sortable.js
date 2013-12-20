var removeIntent = false;

$(document).ready(function(){
  $(".sortable").sortable({
    placeholder: "sortable-placeholder",
    items: "> li.sortable-active",
    handle: ".handle",
    axis: "y",
    over: function(){
      removeIntent = false;
    },
    out: function(){
      removeIntent = true;
    },
    beforeStop: function(event, ui){
      if(removeIntent){
        ui.item.remove();
      }
    },
    update: function(){
      $.post($(this).data('update-url'), $(this).sortable('serialize'))
    }
  });
});