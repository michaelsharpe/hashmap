
$(document).ready(function(){
  $(".sortable-collections").sortable({
    placeholder: "sortable-placeholder",
    items: "> li.sortable-active",
    handle: ".handle",
    axis: "y",
    update: function(){
      $.post($(this).data('update-url'), $(this).sortable('serialize'))
    }
  });
});


$(document).ready(function(){
  $(".sortable-tags").sortable({
    placeholder: "sortable-placeholder",
    items: "> li.sortable-active",
    handle: ".handle",
    axis: "y",
    update: function(){
      $.post($(this).data('update-url'), $(this).sortable('serialize'))
    }
  });
});