class GeomarkersController < ApplicationController
  def index
    if params[:search].present?
      @geomarkers = search
    elsif params[:tag].present?
      @geomarkers = Geomarker.tagged_with(params[:tag], :any => true)
    else
      if params[:view] == "collection"
        @geomarkers = Geomarker.tagged_with(Geomarker.all_collection_tags(current_user), :any => true)
      else
        @geomarkers = Geomarker.all
      end
    end
    respond_to do |format|
      format.html
      format.json
      format.js do
        ne = params[:ne].split(',').collect{|e|e.to_f}  
        sw = params[:sw].split(',').collect{|e|e.to_f}
        tags = params[:search]
        @geomarkers = Geomarker.tagged_with(tags, :any => true).in_bounds([sw, ne]) unless tags == ""
        @geomarkers = Geomarker.in_bounds([sw, ne]) if tags == ""
        render :json => @geomarkers.to_json 
      end
    end
  end
  
  def show
    @geomarker = Geomarker.find(params[:id])
    @user = User.find(@geomarker.user_id)
  end
  
  def new
    @geomarker = Geomarker.new

    respond_to do |format|
      format.js
      format.html
    end
  end
  
  def create
    @geomarker = Geomarker.new(geomarker_params)
    @geomarker.user_id = current_user.id if current_user
    respond_to do |format|
      if @geomarker.save
        format.html { redirect_to geomarker_path(@geomarker) }
        format.js
      else
        format.html { render "new" }
        format.js
      end
    end
  end
  
  def edit
    @geomarker = Geomarker.find(params[:id])
  end
  
  def update
    @geomarker = Geomarker.find(params[:id])
    params[:geomarker][:user_id] = current_user.id
    if @geomarker.update_attributes(geomarker_params)
      redirect_to geomarker_path(@geomarker)
    else
      render "edit"
    end
  end
  
  def destroy
    @geomarker = Geomarker.find(params[:id])
    @geomarker.destroy
    redirect_to geomarkers_path
  end

  private
  def geomarker_params
    params.require(:geomarker).permit(:name, :description, :latitude, :longitude, :tag_list, :view, :sw, :ne, :image)
  end

  def search
    if params[:option] == "1"
      return Geomarker.tagged_with(params[:search], :any => true)
    else
      return Geomarker.tagged_with(params[:search], :all => true)
    end    
  end
end