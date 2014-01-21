class FriendshipsController < ApplicationController
  def create
    @friendship = Friendship.new(friendship_params)
    if @friendship.save
      respond_to do |format|
        format.html
        format.js
      end
    else
      respond_to do |format|
        format.html
        format.js
      end
    end

  end

  def update
    @friendship = Friendship.find(params[:id])
    @user = current_user
    if params[:accepted]
      @friendship.update_attribute("accepted", true)
    end
    if params[:ignored]
      @friendship.update_attribute("ignored", true)
    end
    respond_to do |format|
      format.html
      format.js
    end
  end

  private
  def friendship_params
    params.require(:friendship).permit(:user_id, :friend_id)
  end
end
