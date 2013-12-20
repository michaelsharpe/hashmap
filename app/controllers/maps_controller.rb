class MapsController < ApplicationController
  before_filter :load_user

  def index
    @collections = @user.collections.order("position").all
  end

  def sort
    params[:collection].each_with_index do |id, index|
    Collection.where(id: id).update_all(position: index+1)
  end
    render nothing: true
  end

  private

  def load_user
    @user = current_user
  end

end
