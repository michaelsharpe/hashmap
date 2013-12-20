class SessionsController < ApplicationController
  skip_before_filter :require_login

  def new
    @user = User.new 
  end

  def create
    if @user = login(params[:username], params[:password], params[:remember_me])
      redirect_back_or_to(root_url, notice: "Login successful!")
    else
      flash.now[:alert] = "Login failed"
      render "new"
    end
  end

  def destroy
    logout
    redirect_to(root_url, notice: "You are now logged out.") 
  end
end
