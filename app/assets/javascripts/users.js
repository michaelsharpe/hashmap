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

function requestFriendship(friendID){
  $.ajax({
    type: "POST",
    url: "/friendships",
    dataType: "script",
    data: { friendship: {
      user_id: current_user_id,
      friend_id: friendID }
    }
  });
}

function acceptFriendship(friendshipID, ownProfile){
  $.ajax({
    type: "PATCH",
    url: "/friendships/" + friendshipID,
    dataType: "script",
    data: {
      accepted: true,
      own_profile: ownProfile }
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