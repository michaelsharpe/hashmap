class CollectionsController < ApplicationController
  before_filter :load_user

  def index
    user = User.find(params[:user_id])
    @collections = user.collections.load
  end

  def new
   @collection = @user.collection.build
  end

  def create
    @collection = @user.collections.create(collection_params)
    create_tags(@collection, params[:tag_list])
    @collection.user_id = current_user.id if current_user
    respond_to do |format|
      if @collection.save
        format.html { render "show" }
        format.js
      else
        format.html { render "new" }
      end
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
    params.require(:collection).permit(:user_id, :name, :description)
  end

  def load_user
    @user = current_user
  end

  def create_tags(collection, tag_list)
    tag_list.split(", ").each do |tag|
      new_tag = collection.collectionTags.create!(name: tag, visibility: true)
    end
  end

end
