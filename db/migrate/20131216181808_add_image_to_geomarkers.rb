class AddImageToGeomarkers < ActiveRecord::Migration
  add_column :geomarkers, :image, :string
end
