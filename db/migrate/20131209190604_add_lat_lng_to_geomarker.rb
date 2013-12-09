class AddLatLngToGeomarker < ActiveRecord::Migration
  def change
    add_column :geomarkers, :latitude, :decimal, :precision => 8, :scale => 6
    add_column :geomarkers, :longitude, :decimal, :precision => 9, :scale => 6
  end
end
