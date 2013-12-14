class MapsController < ApplicationController
  before_filter :load_user

  def index
    @collections = @user.collections.all
  end

  private

  def load_user
    @user = current_user
  end
end
