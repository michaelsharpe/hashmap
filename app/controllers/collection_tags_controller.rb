class CollectionTagsController < ApplicationController
  before_filter :load_user

  def new
    @collection = Collection.find(params[:collection_id])
    @collection.collectionTags.build
  end

  def create
    collection = Collection.find(params[:collection_id])
    @collection_tag = collection.collectionTags.create(collection_tag_params)
    respond_to do |format|
      if @collection_tag.save
        format.html { render "show"}
        format.js
      else
        format.html { render "new" }
      end
    end
  end

  private
  def collection_tag_params
    params.require(:collection_tags).permit(:name)
  end

  def load_user
    @user = current_user
  end
end
