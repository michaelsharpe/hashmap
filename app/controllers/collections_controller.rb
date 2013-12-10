class CollectionsController < ApplicationController
  before_filter :load_user

  def index
    user = User.find(params[:user_id])
    @collections = user.collections.load
  end

  def new
    @collection = @user.collections.build
  end

  def create
    @collection = @user.collections.create(collection_params)
    if @collection.save
      render "show"
    else
      render "new"
    end
  end

  def show
    user = User.find(params[:user_id])
    @collection = user.collections.find(params[:id])
  end

  def edit
    @collection = @user.collections.find(params[:id])
  end

  def update
    @collection = @user.collections.find(params[:id])
    if @collection.update_attributes(collection_params)
      redirect_to user_collection_path(@user.id, @collection.id)
    else
      render "edit"
    end
  end
  
  private
  def collection_params
    params.require(:collection).permit(:user_id, :name, :description, :tag_list)
  end

  def load_user
    @user = current_user
  end

end
