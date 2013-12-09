class GeomarkersController < ApplicationController
  def index
  
  end
  
  def show
    
  end
  
  def new
    
  end
  
  def edit
    
  end
  
  def create
    
  end
  
  
  def update
    
  end
  
  def destroy
    
  end

  private
  def geomarker_params
    params.require(:geomarker).permit(:name, :description, :latitude, :longitude)
  end

end
