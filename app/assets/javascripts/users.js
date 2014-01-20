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

function acceptFriendship(friendshipID){
  $.ajax({
    type: "PATCH",
    url: "/friendships/" + friendshipID,
    dataType: "script",
    data: { accepted: true }
  });
}

function ignoreFriendship(friendshipID){
  $.ajax({
    type: "PATCH",
    url: "/friendships/" + friendshipID,
    dataType: "script",
    data: { ignored: true }
  });
}