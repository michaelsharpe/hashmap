class GeomarkersController < ApplicationController
  def index
    ne = params[:ne].split(',').collect{|e|e.to_f}  
    sw = params[:sw].split(',').collect{|e|e.to_f}
    params[:tags] != "" ? params[:tags] : params[:tags] = nil
  
    if params[:tags]
      @geomarkers = Geomarker.tagged_with(params[:tags], :any => true).in_bounds([sw, ne])
    else
      @geomarkers = Geomarker.all.in_bounds([sw, ne])
    end
  end
  
  def show
    if params[:newMarker]
      @geomarker = Geomarker.order("created_at").reverse_order.find_by_user_id(current_user.id)
    else
      @geomarker = Geomarker.find(params[:id])
    end
    @user = User.find(@geomarker.user_id)

    respond_to do |format|
      format.html
      format.js
    end
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

    respond_to do |format|
      format.html
      format.js
    end
  end
  
  def update
    @geomarker = Geomarker.find(params[:id])
    if params[:geomarker][:remove_image].present?
      @geomarker.remove_image!
      @geomarker.save
      params[:geomarker][:remove_image] = nil
    end
    if @geomarker.update_attributes(geomarker_params)
      respond_to do |format|
        format.html { redirect_to geomarker_path(@geomarker) }
        format.js
      end
    else
      respond_to do |format|
        format.html { render "edit" }
        format.js
      end
    end
  end
  
  def destroy
    @geomarker = Geomarker.find(params[:id])
    @geomarker.destroy

    respond_to do |format|
      format.html { redirect_to geomarkers_path }
      format.js
    end
  end

  private
  def geomarker_params
    params.require(:geomarker).permit(:name, :description, :latitude, :longitude, :tag_list, :view, :sw, :ne, :remove_image, :image)
  end
end