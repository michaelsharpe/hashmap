class GeomarkersController < ApplicationController
  def index
    if params[:search].present?
      @geomarkers = Geomarker.tagged_with(params[:search], :any => true)
    elsif params[:tag].present?
      @geomarkers = Geomarker.tagged_with(params[:tag])
    else
      @geomarkers = Geomarker.all
    end
  end
  
  def show
    @geomarker = Geomarker.find(params[:id])
    @user = User.find(@geomarker.user_id)
  end
  
  def new
    @geomarker = Geomarker.new
  end
  
  def create
    @geomarker = Geomarker.new(geomarker_params)
    @geomarker.user_id = current_user.id
    if @geomarker.save
      redirect_to geomarker_path(@geomarker)
    else
      render "new"
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
    params.require(:geomarker).permit(:name, :description, :latitude, :longitude, :tag_list)
  end
end
