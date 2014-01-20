class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to new_session_path, notice: "Signed up!"
    else
      render "new"
    end
  end

  def show
    @user = User.find(params[:id])
    @friends = all_friends(params[:id])
    respond_to do |format|
      format.js
      format.html
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

  def all_friends(userid)
    friend_list = []
    Friendship.where("user_id = ?", userid).each do |friend|
      friend_list << User.find(friend.friend_id)
    end
    Friendship.where("friend_id = ?", userid).each do |friend|
      friend_list << User.find(friend.user_id)
    end
    friend_list
  end
end