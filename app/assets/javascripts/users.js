function getUserProfile(userID){
  $.ajax({
    type: "GET",
    url: "/users/" + userID,
    dataType: "script"
  });
}

function removeUserProfile(){
  if($(".user-show")){
    $(".user-show").remove();
  }
}