class AddImageToGeomarkers < ActiveRecord::Migration
  def change
    add_column :geomarkers, :image, :string
  end
end
