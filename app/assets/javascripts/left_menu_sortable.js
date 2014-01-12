function activateSortable(){
  $(".sortable-collections").sortable({
    placeholder: "sortable-placeholder",
    items: "> li.sortable-active",
    axis: "y",
    update: function(){
      $.post($(this).data('update-url'), $(this).sortable('serialize'))
    }
  });

  $(".sortable-tags").sortable({
    placeholder: "sortable-placeholder",
    items: "> li.sortable-active",
    axis: "y",
    update: function(){
      $.post($(this).data('update-url'), $(this).sortable('serialize'))
    }
  });
}

  
