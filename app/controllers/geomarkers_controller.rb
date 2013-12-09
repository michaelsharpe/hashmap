class GeomarkersController < ApplicationController
  def index
    @geomarker = Geomarker.all
  end
  
  def show
    @geomarker = Geomarker.find(params[:id])
  end
  
  def new
    @geomarker = Geomarker.new
  end
  
  def create
    @geomarker = Geomarker.new(geomarker_params)
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
    params.require(:geomarker).permit(:name, :description, :latitude, :longitude)
  end
end
